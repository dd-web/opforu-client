import { fail, redirect } from '@sveltejs/kit'

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
  if (locals?.account) throw redirect(301, '/')

  return {
    account: locals.account
  }
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

    console.log('login data:', data);

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