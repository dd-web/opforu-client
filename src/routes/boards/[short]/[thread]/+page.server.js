
/** @type {import("./$types").PageServerLoad} */
export async function load({ fetch, params, parent }) {
  const { boards } = await parent();

  /** @type {{ thread: Thread } & {boards: Board[]}} */
  const data = await fetch(`http://localhost:3001/api/threads/${params.thread}`)
    .then(resp => resp.json())

  const threadBoard = boards?.filter(b => b.short === params.short)[0]

  return {
    thread: data.thread,
    board: threadBoard
  }
}
/** @type {import("./$types").Actions}*/
export const actions = {
  reply: async ({ fetch, cookies, request, locals }) => {
    const data = await request.formData();
    console.log('data', data);
  }
}