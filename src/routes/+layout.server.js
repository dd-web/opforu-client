/** @type {import('./$types').LayoutServerLoad} */
export async function load({ fetch, locals, cookies, parent }) {
  /** @type {TFetchResult<{ boards: IBoard[] }>} */
  const data = await fetch('http://localhost:3001/api/boards')
    .then((resp) => resp.json())

  if (data?.account) {
    locals.account = data.account
  }

  if (data?.session) {
    locals.session = data.session
    cookies.set('session', data?.session?.session_id, { httpOnly: true, path: '/' })
  }

  return {
    boards: data.boards,
    account: data?.account ?? locals.account,
    session: data?.session ?? locals.session,
  }
}