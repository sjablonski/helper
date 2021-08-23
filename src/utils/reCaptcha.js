import { AuthSession, Linking } from 'expo';
import helperApi from 'api/helper';

export default async () => {
  let token = null;
  const redirectUrl = AuthSession.getRedirectUrl();
  const captchaUrl = `${helperApi}/captcha.html?redirectUri=${encodeURIComponent(redirectUrl)}`;
  const result = await AuthSession.startAsync({
    authUrl: captchaUrl,
  });

  if (result.url) {
    const tokenEncoded = Linking.parse(result.url).queryParams.token;
    if (tokenEncoded) token = decodeURIComponent(tokenEncoded);
  }

  return token;
};
