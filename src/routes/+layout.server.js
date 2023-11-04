
import { lookupSession, fetcher } from '$lib/server/db'

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ fetch, locals, cookies }) {
  const data = await fetch('http://localhost:3001/api/boards')
    .then((res) => res.json())

  let s = cookies.get("session")

  const { session } = s ? await fetcher(`session/${s}`).then(r => JSON.parse(r)) : null
  // console.log('SESSION', session)
  if (session) {
    locals.account = session.account;
  }

  return {
    boards: data.boards,
    account: locals.account,
  }
}