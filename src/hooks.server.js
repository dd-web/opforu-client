/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
  const session = event.cookies.get('session')

  if (!session) return resolve(event)
  if (event.locals?.account) return resolve(event)

  const response = await fetch('http://localhost:3001/api/account/me', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ session: session }),
  });

  if (!response.ok) return resolve(event)

  let result = await response.json()
  event.locals.account = result.account

  return await resolve(event)
}