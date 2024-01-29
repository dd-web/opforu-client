
/** @type {import("./$types").PageServerLoad} */
export async function load({ fetch, params, url, cookies, locals }) {
  let page = url.searchParams.get("page")
  let count = url.searchParams.get("count")
  let search = url.searchParams.get("search")

  const qs = new URLSearchParams()

  if (page) qs.append("page", page)
  if (count) qs.append("count", count)
  if (search) qs.append("search", search)

  /** @type {{ records: Thread[] } & { paginator: Paginator } & { board: Board }} */
  const data = await fetch(`http://localhost:3001/api/boards/${params.short}?${qs.toString()}`)
    .then(resp => resp.json())

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
  }
}