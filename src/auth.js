const oidcConfig = {
  authority: 'https://<YOUR_IP_HERE>:5003/',
  client_id: 'js',
  redirect_uri: process.env.REACT_APP_AUTH_REDIRECT_URI,
  response_type: 'code',
  scope: 'ae-resume-api',
  post_logout_redirect_uri: process.env.REACT_APP_POST_LOGOUT_REDIRECT_URI,
  automaticSilentRenew: true,
  filterProtocolClaims: true,
};

export default oidcConfig;