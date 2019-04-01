export default {
  oidc: {
    clientId: '0oaelwrq7XitlODHc356',
    issuer: 'https://dev-613383.okta.com/oauth2/default',
    redirectUri: 'http://localhost:8080/implicit/callback',
    scope: 'openid profile email',
  },
  resourceServer: {
    messagesUrl: 'http://localhost:8000/api/messages',
  },
};
