/** @type {import('./$types').LayoutServerLoad} */
export async function load({ fetch, locals, cookies, parent }) {
  /** @type {{ boards: IBoard[], account: IAccount, session: ISession }} */
  const data = await fetch('http://localhost:3001/api/boards')
    .then((resp) => resp.json())

  return {
    boards: data.boards,
    account: data?.account ?? locals.account,
    session: data?.session ?? locals.session,
  }
}