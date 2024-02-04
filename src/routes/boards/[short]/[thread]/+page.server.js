
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

  /**
   * New reply's should take the content of the reply as well as an array
   * of the assets details that are attached to the reply. Asset details
   * contain information such as the source_id, and any fields the user could
   * have set, such as the title or description.
   *  
   */
  reply: async ({ fetch, request, params }) => {
    const formData = await request.formData();
    const content = formData.get('content');
    const assets = JSON.parse(String(formData.get('assets'))) // must be parsed or encoding will be wrong
    const body = await JSON.stringify({ content, assets });

    const data = await fetch(`http://localhost:3001/api/threads/${params.thread}`, {
      method: 'POST',
      body,
    }).then(resp => resp.json());

    console.log('DATA (reply resp):', data)

    return {
      post_number: data?.post_number ?? 0
      // post_number: 0
    }

  }
}