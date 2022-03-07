// eslint-disable-next-line @typescript-eslint/no-var-requires
const graph = require("@microsoft/microsoft-graph-client");
require("isomorphic-fetch");

function getAuthenticatedClient(accessToken: string) {
  const client = graph.Client.init({
    authProvider: (done: any) => {
      done(null, accessToken);
    }
  });

  return client;
}

export default getAuthenticatedClient;
