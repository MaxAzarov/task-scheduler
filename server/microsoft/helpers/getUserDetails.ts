import getAuthenticatedClient from "./getAuthenticatedClient";

async function getUserDetails(accessToken: string) {
  const client = getAuthenticatedClient(accessToken);

  const user = await client.api("/me").get();
  return user;
}

export default getUserDetails;
