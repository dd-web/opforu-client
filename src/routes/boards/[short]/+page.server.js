
/** @type {import("./$types").PageServerLoad} */
export async function load({ fetch, params, url }) {
  let page = url.searchParams.get("page")
  let count = url.searchParams.get("count")
  let search = url.searchParams.get("search")

  const qs = new URLSearchParams()

  if (page) qs.append("page", page)
  if (count) qs.append("count", count)
  if (search) qs.append("search", search)

  /** @type {{ board: Board } & { threads: Thread[] } & { paginator: Paginator}} */
  const data = await fetch(`http://api.localhost:3001/boards/${params.short}?${qs.toString()}`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
    },

  })
    .then(resp => resp.json())

  // console.log('data', data)

  return {
    board: data.board,
    threads: data.threads,
    pagination: data.paginator
  }
}