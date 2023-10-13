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
    const password = data.get('password')

    const response = await fetch('http://localhost:3001/api/account/login', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, password })
    })

    const result = await response.json()

    if (response.ok) {
      cookies.set('session', result.session.session_id, { httpOnly: true })
    } else {
      return fail(400, { username, incorrect: true })
    }

    locals.account = result.account

    return {
      success: true
    }

  }
}