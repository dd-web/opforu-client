/** @type {import("./$types").PageServerLoad} */
export async function load({ fetch, params, url, request, cookies, locals }) {
  let page = url.searchParams.get("page")
  let count = url.searchParams.get("count")
  let search = url.searchParams.get("search")

  const qs = new URLSearchParams()

  if (page) qs.append("page", page)
  if (count) qs.append("count", count)
  if (search) qs.append("search", search)

  let s = cookies.get("session")


  /** @type {{ "Content-Type": string, "Cookie"?: string }} */
  const headers = {
    "Content-Type": "application/json",
  }

  if (s && s != "") {
    headers["Cookie"] = `session=${s}`
  }

  /** @type {{ records: Article[] } & { paginator: Paginator } & { account?: Account } & { session: Session }} */
  const data = await fetch(`http://localhost:3001/api/articles?${qs.toString()}`, {
    method: 'GET',
    headers,
  })
    .then(res => res.json())


  if (s && s.length > 0 && data?.account) {
    locals.account = data.account;
  }

  return {
    articles: data.records,
    pagination: data.paginator
  }
}