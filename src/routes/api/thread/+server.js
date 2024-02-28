import { error } from '@sveltejs/kit'

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
  const thread = url.searchParams.get('thread') ?? "";
  const board = url.searchParams.get("board") ?? "";

  /** @type {{ thread: IThreadLookupData }} */
  const data = await fetch(`http://localhost:3001/api/internal/thread/${board}/${thread}`)
    .then(resp => resp.json())

  if (!data?.thread || !data?.thread?.slug || typeof data?.thread?.post_count != 'number') {
    error(404, 'post not found')
  }

  return new Response(JSON.stringify(data?.thread))
}