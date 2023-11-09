
import { fetcher } from '$lib/server/db'

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ fetch, locals, cookies }) {
  const data = await fetch('http://localhost:3001/api/boards')
    .then((res) => res.json())

  let cookie = cookies.get("session")
  let session = undefined;

  if (cookie) {
    session = await fetcher(`session/${cookie}`).then(r => JSON.parse(r))
  }

  if (session) {
    locals.account = session.account;
  }

  return {
    boards: data.boards,
    account: locals.account,
  }
}