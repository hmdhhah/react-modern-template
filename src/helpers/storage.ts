import { ICredentials } from 'types/auth';

export const setAuthenticationDetails = (data: ICredentials) => {
  setAccessToken(data.access);
  localStorage.setItem('refreshtoken', data.refresh);
};
export function setAccessToken(access: string) {
  localStorage.setItem('accesstoken', access);
}
export function removeAuthenticationDetails(reload = false) {
  removeAccessToken();
  localStorage.removeItem('refreshtoken');
  localStorage.clear();
  if (reload) {
    window.location.href = '/';
  }
}
export function removeAccessToken() {
  localStorage.removeItem('accesstoken');
}

export const getAccessToken = (): string | null => {
  return localStorage.getItem('accesstoken');
};

export const getRefreshToken = (): string | null => {
  return localStorage.getItem('refreshtoken');
};

export const isAuthenticated = () => !!getAccessToken();
