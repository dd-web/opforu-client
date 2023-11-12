import { fail, redirect } from '@sveltejs/kit'

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals, cookies }) {
  if (locals?.account) throw redirect(301, '/')

  return {
    account: locals.account
  }
}

/** @type {import('./$types').Actions} */
export const actions = {
  login: async ({ cookies, request, locals }) => {
    const data = await request.formData();

    const username = data.get('username')
    const password = data.get('password');
    const body = await JSON.stringify({ username, password })

    const accountRequest = await fetch('http://localhost:3001/api/account/login', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body,
    });

    const accountResult = await accountRequest.json();
    console.log('account result', accountResult)

    if (accountRequest.ok) {

      cookies.set('session', accountResult.session.session_id, { httpOnly: true, path: '/' })
      locals.account = accountResult.account
      return {
        success: true,
        account: accountResult.account
      }
    } else {
      return fail(400, { username, incorrect: true })
    }
  }
}