const URL = process.env.NEXT_PUBLIC_BACKEND_URL;

/**
 * Retrieve data related to user from the API.
 * @param {*} endpoint what is the endpoint
 * @returns {success: boolean; payload: `data retrieved from the bcckend`}
 */
export async function fetchData(endpoint) {
  try {
    const response = await fetch(`${URL}/api/${endpoint}`, {
      credentials: "include"
    });

    const data = await response.json();
    if (!response.ok) return { success: false, payload: data.payload }
    return { success: true, payload: data.payload };
  } catch (error) {
    return { success: false, payload: error.message };
  }
}

/**
 * Update and send informtion orelated to the user to the endpoint.
 * @param {*} endpoint 
 * @param {*} information 
 * @returns 
 */
export async function postData(endpoint, information = {}) {
  try {
  console.log(information)
    const response = await fetch(`${URL}/api/${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(information),
      credentials: "include"
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.payload);

    return { success: true, payload: data.payload };
  } catch (error) {
    return { success: false, payload: error.message };
  }
}