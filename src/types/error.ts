import { AxiosResponse } from 'axios';

export type ErrorCode =
  | 'required'
  | 'unique'
  | 'permission_denied'
  | 'deletion_not_allowed'
  | 'not_found'
  | 'serverError'
  | 'invalid'
  | 'max_digits'
  | 'password_too_common'
  | 'no_active_account';

export interface RequestErrorResponse {
  status: 400 | 401 | 403 | 404 | 500 | 412;
  details: {
    field: string;
    code: ErrorCode;
    message: string;
  }[];
}
export interface RequestErrorMessage {
  unique?: string;
  permission_denied?: string;
  deletion_not_allowed?: string;
  serverError?: string;
  not_found?: string;
  invalid?: string;
  max_digits?: string;
  password_too_common?: string;
  no_active_account?: string;
}
export interface RequestError {
  response: AxiosResponse<RequestErrorResponse>;
}
