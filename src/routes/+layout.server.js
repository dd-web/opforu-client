
/** @type {import('./$types').LayoutServerLoad} */
export async function load({ fetch, locals }) {

  const boards = await fetch('http://api.localhost:3001/boards')

  // /** @type {{ records: Article[] } & { paginator: Paginator }} */
  // const articleData = await fetch('http://api.localhost:3001/articles')
  //   .then(res => res.json())

  return {
    boards: await boards.json(),
    // articles: articleData.records,
    // pagination: articleData.paginator,
    account: locals.account
  }
}