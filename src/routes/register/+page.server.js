import { fail, redirect } from '@sveltejs/kit'

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
  if (locals?.account) throw redirect(301, '/')
  return {
    account: undefined
  }
}


/** @type {import('./$types').Actions} */
export const actions = {
  register: async ({ cookies, request, locals, fetch }) => {
    const data = await request.formData();

    const username = data.get('username')
    const email = data.get('email')
    const password = data.get('password');
    const confirm_password = data.get('confirm-password');

    if (password !== confirm_password) {
      return fail(400, { password, matches: false })
    }

    const body = await JSON.stringify({ username, email, password, confirm_password });

    const registerRequest = await fetch('http://localhost:3001/api/account/register', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body,
    });

    const registerResult = await registerRequest.json();
    // console.log('register result', registerResult);

    if (registerRequest.ok) {
      cookies.set('session', registerResult.session.session_id, { httpOnly: true, path: '/' });
      locals.account = registerResult.session.account;
      return {
        success: true,
        account: registerResult.session.account
      }
    } else {
      return fail(400, { username, email, invalid: true })
    }

  }
}