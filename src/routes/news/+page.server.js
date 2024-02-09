/** @type {import("./$types").PageServerLoad} */
export async function load({ fetch, url, locals }) {
  let page = url.searchParams.get("page")
  let count = url.searchParams.get("count")
  let search = url.searchParams.get("search")

  const qs = new URLSearchParams()

  if (page) qs.append("page", page)
  if (count) qs.append("count", count)
  if (search) qs.append("search", search)

  /** @type {{ records: IArticle[] } & { paginator: IPaginator }} */
  const data = await fetch(`http://localhost:3001/api/articles?${qs.toString()}`)
    .then(res => res.json())

  return {
    articles: data.records,
    pagination: data.paginator,
    account: locals.account
  }
}