import type {Request, Response} from 'express';
import nodemailer from 'nodemailer';
import {z} from 'zod';

const singleLine = (value: string) => !/[\r\n\u0000]/u.test(value);
const schema = z.object({
  name: z.string().trim().min(2).max(80).refine(singleLine),
  email: z.string().trim().max(160).email(),
  phone: z.string().trim().max(24).refine(value => !value || /^\+?[0-9 ()-]+$/u.test(value) && /^\d{7,15}$/u.test(value.replace(/\D/g, ''))),
  subject: z.string().trim().max(120).refine(singleLine),
  message: z.string().trim().min(10).max(1000),
  website: z.literal(''),
}).strict();
export type Message = z.infer<typeof schema>;

type Smtp = {host:string; port:number; user:string; pass:string; to:string};
export async function deliver(config:Smtp, data:Message) {
  if (!config.host || !config.user || !config.pass || !config.to || !Number.isInteger(config.port) || config.port<1 || config.port>65535) throw new Error('SMTP configuration unavailable');
  const transport = nodemailer.createTransport({
    host:config.host, port:config.port, secure:config.port===465, requireTLS:true,
    auth:{user:config.user,pass:config.pass}, connectionTimeout:8000, greetingTimeout:8000, socketTimeout:12000,
  });
  const result = await transport.sendMail({
    from:config.user, to:config.to, replyTo:data.email, subject:'Wiadomość z formularza gabinetu',
    text:`Imię: ${data.name}\nE-mail: ${data.email}\n${data.phone ? `Telefon: ${data.phone}\n` : ''}${data.subject ? `Temat: ${data.subject}\n` : ''}\n${data.message}`,
  });
  if (result.accepted.length !== 1 || result.rejected.length) throw new Error('SMTP did not accept the recipient');
}

export function contactHandler(options:{origin:()=>string; take:(ip:string)=>Promise<boolean>; send:(data:Message)=>Promise<void>}) {
  return async (req:Request, res:Response) => {
    const fail = (status:number, error:string) => {res.status(status).json({ok:false,error});};
    res.set('Cache-Control','no-store');
    if (req.method!=='POST') {res.set('Allow','POST');return fail(405,'Dozwolona jest tylko metoda POST.');}
    const fetchSite = req.get('sec-fetch-site');
    let origin = req.get('origin');
    if (!origin) {
      try {origin = new URL(req.get('referer') ?? '').origin;} catch { /* Missing or malformed referrer. */ }
    }
    if (origin!==options.origin() || (fetchSite && fetchSite!=='same-origin')) return fail(403,'Wyślij wiadomość bezpośrednio ze strony gabinetu.');
    if (!req.is('application/json')) return fail(415,'Nieprawidłowy format wiadomości.');
    const size = (req as Request & {rawBody?:Buffer}).rawBody?.length ?? Buffer.byteLength(JSON.stringify(req.body ?? null));
    if (size>8192) return fail(413,'Wiadomość jest zbyt długa.');
    const result=schema.safeParse(req.body);
    if (!result.success) return fail(400,'Sprawdź imię, e-mail, numer telefonu i długość wiadomości.');
    try {
      if (!await options.take(req.ip ?? 'unknown')) {
        res.set('Retry-After','600');
        return fail(429,'Za dużo prób wysyłki. Spróbuj ponownie za kilka minut.');
      }
      await options.send(result.data);
      res.status(200).json({ok:true});
    } catch {
      // Do not log request data, SMTP credentials or provider error strings.
      console.error('Contact delivery unavailable');
      fail(503,'Nie udało się potwierdzić wysłania wiadomości. Spróbuj ponownie lub skorzystaj z telefonu albo e-maila.');
    }
  };
}
