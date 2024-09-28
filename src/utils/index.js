/**
 * Nothing just a helper function helping for errors
 * @param {string} err error value to be logged.
 */
export function handleError(err) {
  if (err !== null) {
    alert("Got an error! Check the console.");
    console.log(err);
    throw new Error(err);
  }
}

/**
 *
 * @param {string} url the URL.
 * @param {any} opts headers, body, method etc things.
 * @returns {Promise<[any | null, string | null]>} either json body of response or the error text.
 */
export async function safeFetch(url, opts = undefined) {
  try {
    const resp = await fetch(url, opts);

    if (!resp.ok) {
      return [null, resp.statusText];
    }

    const jsonBody = await resp.json();

    return [jsonBody, null];
  } catch (err) {
    return [null, err.toString()];
  }
}
