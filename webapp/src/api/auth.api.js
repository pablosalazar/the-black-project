import axios from 'axios';
import { BASE_URL } from '../constants/defaultValues';

export const LOGIN_URL = `${BASE_URL}/auth/login`;
export const VERIFY_TOKEN_URL = `${BASE_URL}/auth/verify`;
export const FORGOT_PASSWORD_URL = `${BASE_URL}/auth/forgot-password`;

export function signIn(email, password) {
  return axios.post(LOGIN_URL, { login: email, password });
}

export function verifyToken(token) {
  return axios.get(VERIFY_TOKEN_URL, {
    headers: { Authorization: 'Bearer ' + token },
  });
}
