import { redirect } from "@sveltejs/kit";

export const load = async ({ cookies }) => {
  const sessionid = cookies.get("session");

  const res = await fetch("http://localhost:3001/api/account/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${sessionid}`
    },

  })

}