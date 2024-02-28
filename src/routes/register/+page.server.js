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
  register: async ({ cookies, request, locals, fetch }) => {
    const formData = await request.formData();

    const username = formData.get('username')
    const email = formData.get('email')
    const password = formData.get('password');
    const confirm_password = formData.get('confirm-password');

    if (password !== confirm_password) {
      return fail(400, { password: 'Password does not match' })
    }

    const body = await JSON.stringify({ username, email, password, confirm_password });

    const data = await fetch('http://localhost:3001/api/account/register', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body,
    }).then((resp) => resp.json())

    console.log('register data', data);

    if (data && data?.account && data?.session) {
      cookies.set('session', data?.session?.session_id, { httpOnly: true, path: '/' });
      locals.account = data?.account;
      return {
        success: true,
        account: data?.account
      }
    }

    return fail(400, { username, email, invalid: true })
  }
}