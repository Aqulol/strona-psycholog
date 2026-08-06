#!/usr/bin/env node
/*
 * czytaj-wiadomosci.js
 * Prosty program do odczytu wiadomosci z formularza kontaktowego
 * (Firestore, kolekcja "messages" — projekt psychologplebaniak-e4480).
 *
 * Wymagania: Node.js 18 lub nowszy (ten sam, ktory buduje strone).
 * Bez zadnych dodatkowych instalacji — tylko wbudowane moduly.
 *
 * Uruchomienie:
 *   node czytaj-wiadomosci.js
 * lub z inna nazwa pliku klucza:
 *   node czytaj-wiadomosci.js sciezka/do/klucz.json
 *
 * Klucz (raz): https://console.firebase.google.com/project/psychologplebaniak-e4480/settings/serviceaccounts/adminsdk
 * -> "Generuj nowy klucz prywatny" -> pobrany plik zapisz jako "service-account.json"
 * w tym samym folderze co ten program.
 */
'use strict';

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const KEY_PATH =
  process.argv[2] ||
  process.env.GOOGLE_APPLICATION_CREDENTIALS ||
  path.join(__dirname, 'service-account.json');
const SCOPE = 'https://www.googleapis.com/auth/datastore';

function base64url(buf) {
  return Buffer.from(buf)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

function makeJwt(acc) {
  const header = { alg: 'RS256', typ: 'JWT' };
  const now = Math.floor(Date.now() / 1000);
  const claims = {
    iss: acc.client_email,
    scope: SCOPE,
    aud: acc.token_uri,
    iat: now,
    exp: now + 3600,
  };
  const signingInput =
    base64url(JSON.stringify(header)) + '.' + base64url(JSON.stringify(claims));
  const signature = crypto.sign('RSA-SHA256', Buffer.from(signingInput), acc.private_key);
  return signingInput + '.' + base64url(signature);
}

async function getAccessToken(acc) {
  const res = await fetch(acc.token_uri, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body:
      'grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=' +
      encodeURIComponent(makeJwt(acc)),
  });
  if (!res.ok) {
    throw new Error('Blad autoryzacji: ' + res.status + ' ' + (await res.text()).slice(0, 300));
  }
  const data = await res.json();
  if (!data.access_token) {
    throw new Error('Nie otrzymano tokenu: ' + JSON.stringify(data).slice(0, 300));
  }
  return data.access_token;
}

async function fetchMessages(token, projectId) {
  const url =
    'https://firestore.googleapis.com/v1/projects/' +
    projectId +
    '/databases/(default)/documents/messages?orderBy=createdAt%20desc&pageSize=500';
  const res = await fetch(url, { headers: { Authorization: 'Bearer ' + token } });
  if (!res.ok) {
    throw new Error('Blad odczytu Firestore: ' + res.status + ' ' + (await res.text()).slice(0, 300));
  }
  const data = await res.json();
  return data.documents || [];
}

function field(v) {
  if (v === undefined || v === null) return '';
  if (typeof v === 'string') return v;
  if (v.stringValue !== undefined) return v.stringValue;
  if (v.booleanValue !== undefined) return v.booleanValue ? 'tak' : 'nie';
  if (v.integerValue !== undefined) return v.integerValue;
  if (v.timestampValue !== undefined) {
    const d = new Date(v.timestampValue);
    return d.toLocaleString('pl-PL', {
      timeZone: 'Europe/Warsaw',
      dateStyle: 'short',
      timeStyle: 'short',
    });
  }
  return JSON.stringify(v);
}

(async () => {
  if (!fs.existsSync(KEY_PATH)) {
    console.error('');
    console.error('Nie znaleziono pliku klucza: ' + KEY_PATH);
    console.error('');
    console.error('Jak przygotowac klucz (wystarczy raz):');
    console.error('1. Wejdz na: https://console.firebase.google.com/project/psychologplebaniak-e4480/settings/serviceaccounts/adminsdk');
    console.error('2. Kliknij "Generuj nowy klucz prywatny", potem "Wygeneruj klucz".');
    console.error('3. Pobrany plik (cos.json) zapisz jako: ' + path.join(__dirname, 'service-account.json'));
    console.error('   (obok tego programu, w tym samym folderze)');
    console.error('');
    process.exit(1);
  }

  let acc;
  try {
    acc = JSON.parse(fs.readFileSync(KEY_PATH, 'utf8'));
  } catch (e) {
    console.error('Blad odczytu pliku klucza:', e.message);
    process.exit(1);
  }

  try {
    const token = await getAccessToken(acc);
    const docs = await fetchMessages(token, acc.project_id);

    if (docs.length === 0) {
      console.log('');
      console.log('Brak wiadomosci w kolekcji "messages".');
      console.log('Jesli wysylales/as test z formularza, sprawdz, czy baza Firestore');
      console.log('zostala utworzona: https://console.firebase.google.com/project/psychologplebaniak-e4480/firestore');
      return;
    }

    console.log('');
    console.log('Wiadomosci z formularza (' + docs.length + '):');
    console.log('----------------------------------------');
    docs.forEach((doc, i) => {
      const f = doc.fields || {};
      console.log('[' + (i + 1) + '] ' + field(f.createdAt));
      console.log('  Od:       ' + field(f.name));
      console.log('  Kontakt:  ' + field(f.contact));
      console.log('  Zgoda RODO: ' + field(f.rodoConsent));
      console.log('  Wiadomosc:');
      const msg = String(field(f.message)).split('\n');
      msg.forEach((line) => console.log('    ' + line));
      console.log('----------------------------------------');
    });
  } catch (e) {
    console.error('');
    console.error('Blad:', e.message);
    process.exit(1);
  }
})();
