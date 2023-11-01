
/** @type {import("./$types").PageServerLoad} */
export async function load({ fetch, params }) {
  /** @type {{ thread: Thread }} */
  const data = await fetch(`http://localhost:3001/threads/${params.thread}`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
    },

  })
    .then(resp => resp.json())

  return {
    thread: data.thread
  }
}