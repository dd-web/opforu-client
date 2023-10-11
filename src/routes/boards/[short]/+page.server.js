
/** @type {import("./$types").PageServerLoad} */
export async function load({ fetch, params, url }) {
  /** @type {{ board: Board } & { data: Paginator<Thread> }} */
  const data = await fetch(`http://localhost:3001/api/boards/${params.short}`).then(resp => resp.json())

  return {
    board: data.board,
    threads: data.data
  }
}