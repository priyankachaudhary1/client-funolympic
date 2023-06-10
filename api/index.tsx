"use client";
import axios from "axios";
import { toast } from "react-toastify";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

function token() {
  const token = localStorage.getItem("token");
  return token;
}

const apiClient = axios.create({
  baseURL: baseUrl,
});

apiClient.interceptors.request.use(function (request) {
  request.headers["Authorization"] = `Bearer ${token()}`;
  return request;
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
      localStorage.setItem("id", response?.data?.id);
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

export const userList = async () => {
  try {
    const response: any = await apiClient.get(baseUrl + "/user");
    return response.data;
  } catch (error: any) {
    if (error?.response?.data) {
      return Promise.reject(error.response.data);
    } else {
      return Promise.reject(error);
    }
  }
};

export const changeUserStatus = async (id: string) => {
  try {
    const response: any = await apiClient.patch(baseUrl + "/user/" + id);
    return response.data;
  } catch (error: any) {
    if (error?.response?.data) {
      return Promise.reject(error.response.data);
    } else {
      return Promise.reject(error);
    }
  }
};

export const getVideoCategory = async () => {
  try {
    const response: any = await apiClient.get(baseUrl + "/video-category");
    return response.data;
  } catch (error: any) {
    if (error?.response?.data) {
      return Promise.reject(error.response.data);
    } else {
      return Promise.reject(error);
    }
  }
};

export const addVideoCategory = async (data: any) => {
  try {
    const response: any = await apiClient.post(baseUrl + "/video-category", {
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

export const editVideoCategory = async (data: any) => {
  try {
    const response: any = await apiClient.patch(
      baseUrl + "/video-category/" + data.id,
      {
        ...data,
      }
    );
    return response.data;
  } catch (error: any) {
    if (error?.response?.data) {
      return Promise.reject(error.response.data);
    } else {
      return Promise.reject(error);
    }
  }
};

export const deleteVideoCategory = async (id: string) => {
  try {
    const response: any = await apiClient.delete(
      baseUrl + "/video-category/" + id
    );
    return response.data;
  } catch (error: any) {
    if (error?.response?.data) {
      return Promise.reject(error.response.data);
    } else {
      return Promise.reject(error);
    }
  }
};

export const getAllVideo = async () => {
  try {
    const response: any = await apiClient.get(baseUrl + "/video");
    console.log(response);
    return response.data;
  } catch (error: any) {
    if (error?.response?.data) {
      return Promise.reject(error.response.data);
    } else {
      return Promise.reject(error);
    }
  }
};

export const getfilterVideo = async (id: string) => {
  try {
    const response: any = await apiClient.get(
      baseUrl + "/video/category/" + id
    );
    console.log(response);
    return response.data;
  } catch (error: any) {
    if (error?.response?.data) {
      return Promise.reject(error.response.data);
    } else {
      return Promise.reject(error);
    }
  }
};

export const addVideo = async (data: any) => {
  try {
    const formData: any = new FormData();
    Object.entries(data)?.forEach((el: any) => {
      formData.append(`${el[0]}`, el[1]);
    });
    const response: any = await apiClient.post(baseUrl + "/video", formData, {
      headers: { "Content-Type": "multipart/form-data" },
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

export const editVideo = async (data: any) => {
  try {
    const response: any = await apiClient.patch(
      baseUrl + "/video/" + data?.id,
      data
    );

    return response.data;
  } catch (error: any) {
    if (error?.response?.data) {
      return Promise.reject(error.response.data);
    } else {
      return Promise.reject(error);
    }
  }
};

export const deleteVideo = async (id: string) => {
  try {
    const response: any = await apiClient.delete(baseUrl + "/video/" + id);

    return response.data;
  } catch (error: any) {
    if (error?.response?.data) {
      return Promise.reject(error.response.data);
    } else {
      return Promise.reject(error);
    }
  }
};

export const userProfile = async (data: any) => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]: any) => {
    formData.append(`${key}`, value);
  });
  try {
    const response: any = await apiClient.patch(
      baseUrl + "/user/profile",
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    return response.data;
  } catch (error: any) {
    if (error?.response?.data) {
      return Promise.reject(error.response.data);
    } else {
      return Promise.reject(error);
    }
  }
};

apiClient.interceptors.response.use(
  function (response) {
    const { status, data } = response;
    if (status == 201 || status == 200) {
      toast.success(data.message, { autoClose: 1000 });
    }
    return response;
  },
  function (error) {
    const { status, data } = error.response;
    if (status == 401 || status == 403 || status == 409) {
      toast.error(data.message, { autoClose: 1000 });
    }
    if (status == 500) {
      toast.error("Server Error!", { autoClose: 1000 });
    }
    if (status == 422 || status == 400) {
      toast.error("Please fill form !", { autoClose: 1000 });
    }
    return Promise.reject(error);
  }
);

export const getVideo = async (id: string) => {
  try {
    const response: any = await apiClient.get(baseUrl + "/video/" + id);
    console.log(response);
    return response.data;
  } catch (error: any) {
    if (error?.response?.data) {
      return Promise.reject(error.response.data);
    } else {
      return Promise.reject(error);
    }
  }
};

export const addFeedback = async (data: any) => {
  try {
    const response: any = await apiClient.post(baseUrl + "/feedback", data);

    return response.data;
  } catch (error: any) {
    if (error?.response?.data) {
      return Promise.reject(error.response.data);
    } else {
      return Promise.reject(error);
    }
  }
};

export const getAllFeedback = async (id: string) => {
  try {
    const response: any = await apiClient.get(baseUrl + "/feedback/" + id);
    console.log(response);
    return response.data;
  } catch (error: any) {
    if (error?.response?.data) {
      return Promise.reject(error.response.data);
    } else {
      return Promise.reject(error);
    }
  }
};

export const getAllComplains = async (id: string) => {
  try {
    const response: any = await apiClient.get(baseUrl + "/complaints/" + id);
    console.log(response);
    return response.data;
  } catch (error: any) {
    if (error?.response?.data) {
      return Promise.reject(error.response.data);
    } else {
      return Promise.reject(error);
    }
  }
};

export const editFeedback = async (data: any) => {
  try {
    const formData: any = new FormData();

    const response: any = await apiClient.patch(
      baseUrl + "/feedback/" + data.id,
      data
    );

    return response.data;
  } catch (error: any) {
    if (error?.response?.data) {
      return Promise.reject(error.response.data);
    } else {
      return Promise.reject(error);
    }
  }
};

export const deleteFeedback = async (id: string, role: string) => {
  const url = role === "admin" ? "/feedback/admin/" : "/feedback/user/";

  try {
    const response: any = await apiClient.delete(baseUrl + url + id);

    return response.data;
  } catch (error: any) {
    if (error?.response?.data) {
      return Promise.reject(error.response.data);
    } else {
      return Promise.reject(error);
    }
  }
};

export const deleteComplains = async (id: string) => {
  try {
    const response: any = await apiClient.delete(baseUrl + "/complaints/" + id);

    return response.data;
  } catch (error: any) {
    if (error?.response?.data) {
      return Promise.reject(error.response.data);
    } else {
      return Promise.reject(error);
    }
  }
};

export const addComplains = async (data: any) => {
  try {
    const response: any = await apiClient.post(baseUrl + "/complaints", data);

    return response.data;
  } catch (error: any) {
    if (error?.response?.data) {
      return Promise.reject(error.response.data);
    } else {
      return Promise.reject(error);
    }
  }
};

export const chagePassword = async (data: any) => {
  try {
    const response: any = await apiClient.patch(
      baseUrl + "/user/password/",
      data
    );

    return response.data;
  } catch (error: any) {
    if (error?.response?.data) {
      return Promise.reject(error.response.data);
    } else {
      return Promise.reject(error);
    }
  }
};

export const getVideoCount = async () => {
  try {
    const response: any = await apiClient.get(baseUrl + "/video/total-videos");
    console.log(response);
    return response.data;
  } catch (error: any) {
    if (error?.response?.data) {
      return Promise.reject(error.response.data);
    } else {
      return Promise.reject(error);
    }
  }
};

export const getUserCount = async () => {
  try {
    const response: any = await apiClient.get(baseUrl + "/user/total-users");
    console.log(response);
    return response.data;
  } catch (error: any) {
    if (error?.response?.data) {
      return Promise.reject(error.response.data);
    } else {
      return Promise.reject(error);
    }
  }
};

export const verifyOtp = async (data: any) => {
  try {
    const response: any = await apiClient.patch(baseUrl + "/user/verify-otp", {
      ...data,
    });
    if (response?.data?.accessToken) {
      localStorage.setItem("token", response?.data?.accessToken);
      localStorage.setItem("role", response?.data?.role);
      localStorage.setItem("id", response?.data?.id);
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

export const getUseMe = async () => {
  try {
    const response: any = await apiClient.get(baseUrl + "/user/me");
    return response.data;
  } catch (error: any) {
    if (error?.response?.data) {
      return Promise.reject(error.response.data);
    } else {
      return Promise.reject(error);
    }
  }
};

export const resendOtp = async (data: any) => {
  try {
    const response: any = await apiClient.patch(
      baseUrl + "/user/resendOtp",
      data
    );
    return response.data;
  } catch (error: any) {
    if (error?.response?.data) {
      return Promise.reject(error.response.data);
    } else {
      return Promise.reject(error);
    }
  }
};
