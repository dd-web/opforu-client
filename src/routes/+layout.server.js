/** @type {import('./$types').LayoutServerLoad} */
export async function load({ fetch, locals, cookies, parent }) {
  /** @type {{boards: IBoard[], account: IAccount, session: ISession, favorite_assets: IFavoriteAssets }} */
  const data = await fetch('http://localhost:3001/api/boards')
    .then((res) => res.json())

  // console.log('layout data', data);
  return {
    boards: data.boards,
    favorite_assets: data?.favorite_assets ?? locals?.favorite_assets,
    account: data?.account ?? locals.account,
    session: data?.session ?? locals.session,
  }
}