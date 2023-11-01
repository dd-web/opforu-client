
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