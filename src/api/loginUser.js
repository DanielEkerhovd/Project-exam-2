import { constants } from './constants';
import { setStorage } from '../storage/localStorage';

export async function loginUser(email, password) {
  const url = constants.base + constants.auth.login;

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    if (data.data.accessToken) {
      setStorage('accessToken', data.data.accessToken);
      console.log(data.data);
    }
  } catch (error) {
    console.error(error);
  }
}
