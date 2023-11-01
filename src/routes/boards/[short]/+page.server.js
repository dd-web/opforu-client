
/** @type {import("./$types").PageServerLoad} */
export async function load({ fetch, params, url, cookies, locals }) {
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

  /** @type {{ board: Board } & { records: Thread[] } & { paginator: Paginator } & { account?: Account }} */
  const data = await fetch(`http://localhost:3001/api/boards/${params.short}?${qs.toString()}`, {
    method: 'GET',
    headers,
  })
    .then(resp => resp.json())

  if (s && s.length > 0 && data?.account) {
    locals.account = data.account;
  }


  return {
    board: data.board,
    threads: data.records,
    pagination: data.paginator
  }
}