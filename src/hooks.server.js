
// /** @type {import('@sveltejs/kit').HandleFetch} */
// export async function handleFetch({ event, request, fetch }) {
//   if (request.url.startsWith('http://api.localhost:3001/')) {
//     request = new Request(
//       request.url.replace('http://api.localhost:3001/', 'http://localhost:3001/api/'),
//       event.request,
//     )
//   }
//   return fetch(request)
// }

// /** @type {import('@sveltejs/kit').Handle} */
// export async function handle({ event, resolve }) {
//   const response = await resolve(event);
//   const cloned = response.clone();
//   let res = await cloned.json();
//   console.log('RESPONSE', res)
//   return response;
// }
