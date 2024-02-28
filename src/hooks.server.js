import { fetcher } from '$lib/server/db';


// /** @type {import('@sveltejs/kit').Handle} */
// export async function handle({ event, resolve }) {
//   const sessid = event.cookies.get('session');
//   if (sessid) {
//     const res = await fetcher(`session/${sessid}`).then(r => JSON.parse(r))
//     if (res?.error && res?.error === 'session expired') {
//       event.cookies.delete('session');
//       event.locals.session = "expired";
//     }
//     if (res?.account) event.locals.account = res.account;
//   }
//   return resolve(event)
// }

