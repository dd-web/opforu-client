
/** @type {import('./$types').LayoutServerLoad} */
export async function load({ fetch }) {
  const list = await fetch('http://localhost:3001/api/boards')
  return {
    boards: await list.json()
  }
}