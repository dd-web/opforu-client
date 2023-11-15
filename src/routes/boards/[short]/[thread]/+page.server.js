
/** @type {import("./$types").PageServerLoad} */
export async function load({ fetch, params }) {
  /** @type {{ thread: Thread }} */
  const data = await fetch(`http://localhost:3001/api/threads/${params.thread}`)
    .then(resp => resp.json())

  return {
    thread: data.thread
  }
}
/** @type {import("./$types").Actions}*/
export const actions = {
  reply: async ({ fetch, cookies, request, locals }) => {
    const data = await request.formData();
    console.log('data', data);
  }
}