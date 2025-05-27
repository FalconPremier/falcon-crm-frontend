import axios, { AxiosResponse } from 'axios';
import { IResponseWrapper } from '@/interfaces/IGlobal';
import { axiosInstance } from '@/lib/axios';

export const getRequestHandler = async <T>(url: string, token?: string) => {
  try {
    const headers = {
      Accept: 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    };
    const response: AxiosResponse<IResponseWrapper<T>> = await axiosInstance.get(url, { headers });

    const data = response.data;
    console.log('Request Response', response);
    if (data.success) {
      return data.data;
    } else {
      alert(data.errors);
      return null;
    }
  } catch (error: any) {
    console.error('Get request failed:', error?.message || error);
    return null;
  }
};

export const postMultiPartFormRequestHandler = async <T>(
  url: string,
  formData: FormData,
  token?: string,
): Promise<T | null> => {
  try {
    const response: AxiosResponse<IResponseWrapper<T>> = await axiosInstance.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });

    const data = response.data;
    console.log('Request Response', response);
    if (data.success) {
      return data.data;
    } else {
      alert(data.errors);
      return null;
    }
  } catch (error: any) {
    console.error('Multipart request failed:', error?.message || error);
    return null;
  }
};

export const postRequestHandler = async <T, BodyDataType>(
  url: string,
  body?: BodyDataType,
  token?: string,
): Promise<T | null> => {
  try {
    const response: AxiosResponse<IResponseWrapper<T>> = await axiosInstance.post(url, body, {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });

    const data = response.data;
    if (data.success) {
      return data.data;
    } else {
      alert(data.errors);
      return null;
    }
  } catch (error: any) {
    console.error('Post request failed:', error?.message || error);
    return null;
  }
};
