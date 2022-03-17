const oidcConfig = {
  authority: 'https://ae-resume-idp.azurewebsites.net/',
  client_id: 'js',
  redirect_uri: process.env.REACT_APP_AUTH_REDIRECT_URI,
  response_type: 'code',
  scope: 'ae-resume-api',
  post_logout_redirect_uri: process.env.REACT_APP_POST_LOGOUT_REDIRECT_URI,
  automaticSilentRenew: true,
  filterProtocolClaims: true,
};

export default oidcConfig;