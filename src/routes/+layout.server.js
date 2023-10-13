
/** @type {import('./$types').LayoutServerLoad} */
export async function load({ fetch, locals }) {
  const list = await fetch('http://localhost:3001/api/boards')
  return {
    boards: await list.json(),
    account: locals.account
  }
}