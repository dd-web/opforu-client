
/** @type {import("./$types").PageServerLoad} */
export async function load({ fetch, params, url }) {
  /** @type {Board[]} */
  const board = await fetch(`http://localhost:3001/api/boards/${params.short}`).then(resp => resp.json())

  return {
    board: board[0]
  }
}