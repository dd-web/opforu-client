
/** @type {import('./$types').LayoutServerLoad} */
export async function load({ fetch, locals }) {
  const list = await fetch('http://api.localhost:3001/boards')
  return {
    boards: await list.json(),
    account: locals.account
  }
}