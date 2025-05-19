import axios, { AxiosResponse } from 'axios';
import { IResponseWrapper } from '@/interfaces/IGlobal';
import { axiosInstance } from '@/lib/axios';

export const getRequestHandler = async <T>(url: string) => {
  try {
    const response: AxiosResponse<IResponseWrapper<T>> = await axiosInstance.get(url);

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
): Promise<T | null> => {
  try {
    const response: AxiosResponse<IResponseWrapper<T>> = await axiosInstance.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
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
): Promise<T | null> => {
  try {
    const response: AxiosResponse<IResponseWrapper<T>> = await axiosInstance.post(url, body, {
      headers: {
        'Content-Type': 'application/json',
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
    console.error('Post request failed:', error?.message || error);
    return null;
  }
};
