import { UserManager } from 'oidc-client-ts';
import oidcConfig from '../auth';

const userManager = new UserManager({ ...oidcConfig, response_mode: 'query' });

function Callback() {
  userManager.signinRedirectCallback().then(() => {
    window.location = '/employee';
  }).catch((error) => {
    return <div>Oops... there was an unexpected authentication error. Please try again later.</div>;
  });

  return <div>We're logging you in... hang tight.</div>;
}

export default Callback;