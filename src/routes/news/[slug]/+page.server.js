/** @type {import("./$types").PageServerLoad} */
export async function load({ fetch, params, url, cookies, locals }) {
  /** @type {{ article: IArticle }} */
  const data = await fetch(`http://localhost:3001/api/articles/${params.slug}`)
    .then(resp => resp.json())

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
  comment: async function ({ request, params, fetch }) {
    const formData = await request.formData();
    const content = formData.get('content');
    const assets = JSON.parse(String(formData.get('assets'))) // must be parsed or encoding will be wrong
    const body = await JSON.stringify({ content, assets });

    const data = await fetch(`http://localhost:3001/api/articles/${params.slug}`, {
      method: 'POST',
      body,
    }).then(resp => resp.json());

    return {
      comment_number: data?.comment_number ?? 0
    }
  }
}