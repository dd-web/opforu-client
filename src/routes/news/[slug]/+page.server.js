import { JSDOM } from 'jsdom'
import DOMPurify from 'dompurify'

/** @type {import("./$types").PageServerLoad} */
export async function load({ fetch, params, url, cookies, locals }) {
  /** @type {TFetchResult<{ article: IArticle }>} */
  const data = await fetch(`http://localhost:3001/api/articles/${params.slug}`)
    .then(resp => resp.json())

  if (data?.account) {
    locals.account = data.account;
  }

  if (data?.session) {
    locals.session = data.session
    cookies.set('session', data?.session?.session_id, { httpOnly: true, path: '/' });
  }

  return {
    article: data.article
  }
}

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
   * New comments should take body of comment as well as an array of asset details.
   * Admins/Mods should have an option for posting anonymously, for instance in case
   * of bad news nobody wants to deliver or something
   * 
   * anonimity is taken care of on the database level in binary operators
   */
  comment: async function ({ request, params, fetch, locals }) {
    const formData = await request.formData();
    const content = String(formData.get('content'));
    const assets = JSON.parse(String(formData.get('assets'))) // must be parsed or encoding will be wrong
    let anonimize = false;

    if (locals?.account?.role === 'admin' || locals?.account?.role === 'mod') {
      anonimize = typeof formData.get('anonymize') === 'string' && formData.get('anonymize') === 'on';
    }

    const window = new JSDOM('').window;
    const purify = DOMPurify(window);
    console.log('content?', content)

    const cleanContent = purify.sanitize(content);

    const body = await JSON.stringify({ content: content, assets, make_anonymous: anonimize });
    const data = await fetch(`http://localhost:3001/api/articles/${params.slug}`, {
      method: 'POST',
      body,
    }).then(resp => resp.json());

    return {
      comment_number: data?.comment_number ?? 0,
      article_id: params?.slug
    }
  }
}