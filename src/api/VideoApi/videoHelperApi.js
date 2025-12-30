'use client'
import { axiosInstance } from '../axiosConfig';

export const postVideo = async (data) => {
  try {
    const response = await axiosInstance.post(`videos/upload`,data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("error post Video...", error);
    throw error;
  }
};

export const deleteVideo = async (data) => {
  try {
    const response = await axiosInstance.delete(
      `videos/delete?url=${data?.url}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
