import {createHmac} from 'node:crypto';
import {onRequest} from 'firebase-functions/v2/https';
import {defineSecret} from 'firebase-functions/params';
import {initializeApp} from 'firebase-admin/app';
import {getFirestore, Timestamp} from 'firebase-admin/firestore';
import {contactHandler, deliver} from './contact';

initializeApp();
const db=getFirestore();
const SMTP_HOST=defineSecret('SMTP_HOST');
const SMTP_PORT=defineSecret('SMTP_PORT');
const SMTP_USER=defineSecret('SMTP_USER');
const SMTP_PASS=defineSecret('SMTP_PASS');
const MAIL_TO=defineSecret('MAIL_TO');

async function take(ip:string) {
  const interval=600_000;
  const window=Math.floor(Date.now()/interval);
  const key=createHmac('sha256',SMTP_PASS.value()).update(`${window}:${ip}`).digest('hex');
  const collection=db.collection('contactRateLimits');
  const global=collection.doc(`window-${window}`);
  const client=collection.doc(`client-${key}`);
  const expiresAt=Timestamp.fromMillis((window+1)*interval);
  return db.runTransaction(async transaction=>{
    const [globalEntry,clientEntry]=await transaction.getAll(global,client);
    const total=Number(globalEntry.get('count') ?? 0);
    const attempts=Number(clientEntry.get('count') ?? 0);
    if (total>=30 || attempts>=4) return false;
    transaction.set(global,{count:total+1,expiresAt});
    transaction.set(client,{count:attempts+1,expiresAt});
    return true;
  });
}

export const sendContactForm=onRequest({
  region:'europe-west1', timeoutSeconds:45, maxInstances:3,
  secrets:[SMTP_HOST,SMTP_PORT,SMTP_USER,SMTP_PASS,MAIL_TO],
},contactHandler({
  origin:()=> 'https://psychologplebaniak.pl', take,
  send:data=>deliver({host:SMTP_HOST.value(),port:Number(SMTP_PORT.value()),user:SMTP_USER.value(),pass:SMTP_PASS.value(),to:MAIL_TO.value()},data),
}));
