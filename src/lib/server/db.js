/** @type {string} Internal API route - only accepts same origin requests */
const internalURL = "http://localhost:3001/api/internal";
/** @type {Partial<RequestInit>} default request options */
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

