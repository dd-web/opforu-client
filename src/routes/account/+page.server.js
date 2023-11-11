import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export function load(event) {
  throw redirect(302, '/')
}

/** @type {import('./$types').Actions} */
export const actions = {
  logout: async (event) => {
    const sessionid = event.cookies.get("session");
    if (!sessionid || sessionid === '') throw redirect(302, '/login')

    /**
     * the response here doesn't matter. it's an attempt to delete the session from the server.
     * however it will be deleted from the client regardless, and the server eventually when it expires.
     */
    await event.fetch('http://localhost:3001/api/account/logout', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ session_id: sessionid })
    });

    event.cookies.delete("session");
    event.locals.account = null;
    throw redirect(302, '/login')
  }
}