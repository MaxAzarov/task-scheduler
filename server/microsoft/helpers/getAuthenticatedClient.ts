const graph = require("@microsoft/microsoft-graph-client");
require("isomorphic-fetch");

function getAuthenticatedClient(accessToken: string) {
  const client = graph.Client.init({
    authProvider: (done: any) => {
      done(null, accessToken);
    },
  });
  console.log(
    "🚀 ~ file: getAuthenticatedClient.ts ~ line 10 ~ getAuthenticatedClient ~ client",
    client
  );

  return client;
}

export default getAuthenticatedClient;
