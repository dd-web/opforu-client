
/** @type {import('./$types').LayoutServerLoad} */
export async function load({ fetch, locals, cookies }) {
  let s = cookies.get("session")

  /** @type {{ "Content-Type": string, "Cookie"?: string }} */
  const headers = {
    "Content-Type": "application/json",
  }

  if (s && s != "") {
    headers["Cookie"] = `session=${s}`
  }

  const data = await fetch('http://localhost:3001/api/boards', {
    method: 'GET',
    headers,
  })
    .then((res) => res.json())
  // let result = await boardListReq.json()
  // console.log('boards res:', result)
  // console.log('LOCALS', locals)

  if (s && s.length > 0 && data?.account) {
    locals.account = data.account;
  }

  // /** @type {{ records: Article[] } & { paginator: Paginator }} */
  // const articleData = await fetch('http://api.localhost:3001/articles')
  //   .then(res => res.json())

  return {
    boards: data.boards,
    account: locals.account
  }
}