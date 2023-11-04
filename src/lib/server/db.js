
// export const getAccountFromSession = async (session) => {
//   const res = await fetch("http://localhost:3001/api/")
// }

/**
 * Lookup a session by ID
 * @param {string} session_id - The session ID to lookup
 * @returns {Promise<string>}
 */
export const lookupSession = async (session_id) => {
  const res = await fetch(`http://localhost:3001/api/internal/session/${session_id}`);
  return await res.text()
}

const internalURL = "http://localhost:3001/api/internal";
const fetcherOptions = {
  method: "GET",
  headers: {
    "Content-Type": "application/json"
  },
}


/**
 * Internal API Fetcher for SvelteKit
 * @param {string} url endpoint to fetch (relative to internalURL)
 * @param {Partial<RequestInit>|undefined} opts 
 * @returns {Promise<string>} - response body as string
 */
export async function fetcher(url = "", opts = {}) {
  if (!url) throw new Error("URL is required");
  const fetchURL = url.startsWith("/") ? (internalURL + url) : (internalURL + "/" + url);
  const options = Object.assign({}, fetcherOptions, opts);
  const res = await fetch(fetchURL, options);
  return await res.text();
}

