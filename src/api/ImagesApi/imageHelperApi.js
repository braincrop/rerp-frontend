'use client'
import { axiosInstance } from '../axiosConfig';

export const postImage = async (data) => {
  try {
    const response = await axiosInstance.post(`images/upload`,data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("error post image...", error);
    throw error;
  }
};

export const deleteImage = async (data) => {
  try {
    const response = await axiosInstance.delete(
      `images/upload${data?.url}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
