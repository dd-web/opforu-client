import { JSDOM } from 'jsdom'
import DOMPurify from 'dompurify'

/** @type {import("./$types").PageServerLoad} */
export async function load({ fetch, params, parent, locals, cookies }) {
  const { boards } = await parent();

  /** @type {TFetchResult<{ thread: IThread } & {boards: IBoard[]}>} */
  const data = await fetch(`http://localhost:3001/api/threads/${params.thread}`)
    .then(resp => resp.json())

  if (data?.account) {
    locals.account = data.account;
  }

  if (data?.session) {
    locals.session = data.session;
    cookies.set('session', data?.session?.session_id, { httpOnly: true, path: '/' })
  }

  const threadBoard = boards?.filter(b => b.short === params.short)[0]

  return {
    thread: data.thread,
    board: threadBoard
  }
}
/** @type {import("./$types").Actions} */
export const actions = {
  /**
 * File upload should handle a single file upload, ensuring it's hash is unique.
 * This should return either the existing file's ID or the new saved file's ID.
 * This way we can handle all file uploads the same way.
 */
  fileUpload: async function ({ request, fetch, locals }) {
    const formData = await request.formData();
    const data = await fetch('http://localhost:3001/api/assets', {
      method: 'POST',
      body: formData
    }).then(resp => resp.json());

    return {
      local_id: data?.local_id ?? '',
      source_id: data?.source_id ?? ''
    }
  },

  /**
   * New reply's should take the content of the reply as well as an array
   * of the assets details that are attached to the reply. Asset details
   * contain information such as the source_id, and any fields the user could
   * have set, such as the title or description.
   *  
   */
  reply: async ({ fetch, request, params }) => {
    const formData = await request.formData();
    const content = String(formData.get('content'));
    const assets = JSON.parse(String(formData.get('assets'))) // must be parsed or encoding will be wrong

    const window = new JSDOM('').window;
    const purify = DOMPurify(window);

    const cleanContent = purify.sanitize(content)

    const body = await JSON.stringify({ content: cleanContent, assets });

    const data = await fetch(`http://localhost:3001/api/threads/${params.thread}`, {
      method: 'POST',
      body,
    }).then(resp => resp.json());

    return {
      post_number: data?.post_number ?? 0
    }
  }
}