/** @type {import("./$types").PageServerLoad} */
export async function load({ fetch, params, url, cookies, locals }) {

  const data = await fetch(`http://localhost:3001/api/news/${params.slug}`)
    .then(resp => resp.json())

  return {
    article: data.article
  }
}