/** @type {import('./$types').LayoutServerLoad} */
export async function load({ fetch, locals, cookies, parent }) {
  /** @type {{boards: IBoard[]}} */
  const data = await fetch('http://localhost:3001/api/boards')
    .then((res) => res.json())


  return {
    boards: data.boards,
    account: locals.account,
    session: locals.session
  }
}