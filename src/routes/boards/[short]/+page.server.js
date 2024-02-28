import { JSDOM } from 'jsdom'
import DOMPurify from 'dompurify'

/** @type {import("./$types").PageServerLoad} */
export async function load({ fetch, params, url, cookies, locals }) {
  let page = url.searchParams.get("page")
  let count = url.searchParams.get("count")
  let search = url.searchParams.get("search")

  const qs = new URLSearchParams()

  if (page) qs.append("page", page)
  if (count) qs.append("count", count)
  if (search) qs.append("search", search)

  /** @type {TFetchResult<{ records: IThread[] } & { paginator: IPaginator } & { board: IBoard }>} */
  const data = await fetch(`http://localhost:3001/api/boards/${params.short}?${qs.toString()}`)
    .then(resp => resp.json())

  if (data?.account) {
    locals.account = data.account;
  }

  if (data?.session) {
    locals.session = data.session;
    cookies.set('session', data?.session?.session_id, { httpOnly: true, path: '/' })
  }

  return {
    threads: data.records,
    board: data.board,
    pagination: data.paginator
  }
}

/** @type {import('./$types').Actions} */
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
   * New thread should take the title and body of the thread, as well as 
   * an array of the assets details that are attached to the thread. Asset details
   * contain information such as the source_id, and any fields the user could have set,
   * such as the title or description.
   */
  newThread: async function ({ request, params, fetch }) {
    const formData = await request.formData();
    const title = String(formData.get('title'));
    const content = String(formData.get('content'));
    const flags = JSON.parse(String((formData.get('flags'))));
    const assets = JSON.parse(String(formData.get('assets'))) // must be parsed or encoding will be wrong

    const window = new JSDOM('').window;
    const purify = DOMPurify(window);

    const cleanTitle = purify.sanitize(title);
    const cleanContent = purify.sanitize(content);

    const body = await JSON.stringify({ title: cleanTitle, content: cleanContent, assets, flags })

    const data = await fetch(`http://localhost:3001/api/boards/${params.short}`, {
      method: 'POST',
      body,
    }).then(resp => resp.json());

    return {
      thread_id: data?.thread_id ?? ''
    }
  }
}