import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

const headers = { "Context-Type": "application/json" };

const apiClient = axios.create({
  baseURL: baseUrl,
  headers: {
    ...headers,
  },
});

export const logIn = async (email: string, password: string) => {
  try {
    const response: any = await apiClient.post(baseUrl + "/auth/login", {
      email,
      password,
    });
    if (response?.data?.accessToken) {
      localStorage.setItem("token", response?.data?.accessToken);
      localStorage.setItem("role", response?.data?.role);
    }

    return response.data;
  } catch (error: any) {
    if (error?.response?.data) {
      return Promise.reject(error.response.data);
    } else {
      return Promise.reject(error);
    }
  }
};

export const signUp = async (data: any) => {
  try {
    const response: any = await apiClient.post(baseUrl + "/user", {
      ...data,
    });
    return response.data;
  } catch (error: any) {
    if (error?.response?.data) {
      return Promise.reject(error.response.data);
    } else {
      return Promise.reject(error);
    }
  }
};
