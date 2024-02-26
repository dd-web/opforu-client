import { error } from '@sveltejs/kit'

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
  const thread = url.searchParams.get('thread') ?? "";
  const post = url.searchParams.get("post") ?? 1;

  /** @type {{ post: IPostLookupData }} */
  const data = await fetch(`http://localhost:3001/api/internal/post/${thread}/${post}`)
    .then(resp => resp.json())

  if (!data?.post || !data?.post?.thread || typeof data?.post?.post_number != 'number') {
    error(404, 'post not found')
  }

  return new Response(JSON.stringify(data?.post))
}