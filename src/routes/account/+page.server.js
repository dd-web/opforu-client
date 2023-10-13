
/** @type {import('./$types').PageServerLoad} */
export function load(event) {
  return {
    account: event.locals.account
  }
}

/** @type {import('./$types').Actions} */
export const actions = {
  logout: async (event) => {
    event.cookies.delete("session");
    event.locals.account = null;
  }
}