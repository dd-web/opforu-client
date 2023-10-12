
/** @type {import("./$types").PageServerLoad} */
export async function load({ fetch, params, url }) {
  let page = url.searchParams.get("page")
  let count = url.searchParams.get("count")
  let search = url.searchParams.get("search")

  const qs = new URLSearchParams()

  if (page) qs.append("page", page)
  if (count) qs.append("count", count)
  if (search) qs.append("search", search)

  /** @type {{ board: Board } & { data: Paginator<Thread> }} */
  const data = await fetch(`http://localhost:3001/api/boards/${params.short}?${qs.toString()}`).then(resp => resp.json())

  return {
    board: data.board,
    threads: data.data
  }
}