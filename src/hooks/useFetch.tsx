import { useCallback, useState } from 'react';
import { type AxiosResponse, isAxiosError } from 'axios';

type Trequest<T, X> = (item: T) => Promise<AxiosResponse<X, any>>;

interface IOptions {
  loadingDefault: boolean;
}

type Treturn<X> =
  | {
      data: X;
      success: true;
    }
  | {
      data: any;
      success: false;
    };

export const useFetch = <T, X>(
  request?: Trequest<T, X>,
  options?: IOptions
) => {
  const [error, setError] = useState<string | null | string[]>();
  const [rawErrors, setRawErrors] = useState<any>();
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(options?.loadingDefault || false);

  const resetErrors = () => {
    setError(null);
  };

  const sendRequest: (requestBody: T) => Promise<Treturn<X>> = useCallback(
    async (requestBody: T) => {
      if (!request)
        return {
          success: false,
          data: null,
        };
      try {
        setLoading(true);
        const response = await request(requestBody);
        setError(null);
        setSuccess(true);
        return {
          success: true,
          data: response.data,
        };
      } catch (err: any) {
        setSuccess(false);
        if (isAxiosError(err)) {
          const errors = err.response?.data.errors;
          setRawErrors(errors);
          if (errors) {
            let errorMessage: string[] = [];
            Object.keys(errors).forEach((key) => {
              errors[key].forEach((e: string) => {
                errorMessage.push(e);
              });
            });
            setError(errorMessage);
            return {
              success: false,
              data: err,
            };
          }
          if (err.response?.data.detail) {
            setError(err.response?.data.detail || err.message);
            return {
              success: false,
              data: err,
            };
          }
          setError(err.message);
          return {
            success: false,
            data: err,
          };
        } else {
          setError(err?.message);
        }
        return {
          success: false,
          data: err,
        };
      } finally {
        setLoading(false);
      }
    },
    [request]
  );

  return { error, loading, success, sendRequest, rawErrors, resetErrors };
};
