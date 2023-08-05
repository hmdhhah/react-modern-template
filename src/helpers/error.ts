import { RequestError, RequestErrorMessage } from 'types/error';

export const getErrorMessages = (
  error: RequestError,
  customMsg?: RequestErrorMessage
): string => {
  try {
    const resData = error.response.data;
    if (resData.status === 400) {
      return resData.details
        .map(detail => {
          const { code, message } = detail;
          switch (code) {
            case 'unique':
              return customMsg?.unique || message;
            case 'invalid':
              return customMsg?.invalid || message;
            case 'max_digits':
              return customMsg?.max_digits || message;
            case 'password_too_common':
              return customMsg?.password_too_common || message;
            default:
              return message;
          }
        })
        .join(',');
    } else if (resData.status === 401) {
      return resData.details
        .map(detail => {
          const { code, message } = detail;
          switch (code) {
            case 'no_active_account':
              return customMsg?.no_active_account || message;
            default:
              return message;
          }
        })
        .join(',');
    } else if (resData.status === 404 || resData.status === 403) {
      return resData.details
        .map(detail => {
          const { code, message } = detail;
          switch (code) {
            case 'deletion_not_allowed':
              return customMsg?.unique || message;
            case 'not_found':
              return customMsg?.not_found || message;
            default:
              return message;
          }
        })
        .join(',');
    } else if (error.response.status === 412) {
      return customMsg?.deletion_not_allowed || 'Oops something went wrong.';
    } else if (resData.status === 500) {
      return customMsg?.serverError || '500 Internal Server Error';
    }
    return `Oops something went wrong.`;
  } catch (error) {
    return '';
  }
};
