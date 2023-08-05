import { IAuthFormValues, ICredentials, ILoginFormValues } from 'types/auth';
import { AxiosRes } from 'types/common';
import { axios_instance } from '../config/axios';

export const AuthMethod = {
  login: async (payload: ILoginFormValues): AxiosRes<ICredentials> =>
    await axios_instance.post(`/api/access/`, payload),
  signUp: async (payload: IAuthFormValues): AxiosRes<{ token: string }> => {
    return await axios_instance.post(`/onboard/`, payload);
  }
};
