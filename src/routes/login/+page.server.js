import { fail, redirect } from '@sveltejs/kit'

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals, url }) {
  const destCtx = url.searchParams.get('next');
  const destId = url.searchParams.get('id');

  if (destCtx && typeof destCtx === 'string' && destCtx.length > 0 &&
    destId && typeof destId === 'string' && destId.length > 0) {
    return {
      account: locals.account
    }
  }

  if (locals?.account) throw redirect(301, '/')
}

/** @type {import('./$types').Actions} */
export const actions = {
  login: async ({ cookies, request, locals, fetch }) => {
    const formData = await request.formData();
    const username = formData.get('username')
    const password = formData.get('password');

    const body = await JSON.stringify({ username, password })

    const data = await fetch('http://localhost:3001/api/account/login', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body,
    }).then((resp) => resp.json())

    if (data && data?.account && data?.session) {
      cookies.set('session', data?.session?.session_id, { httpOnly: true, path: '/' })
      locals.account = data?.account
      return {
        success: true,
        account: data?.account
      }
    } else {
      return fail(400, { username, incorrect: true })
    }
  }
}