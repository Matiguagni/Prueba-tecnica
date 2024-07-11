import { type NextApiResponse } from "next";
import axiosClient from "./axiosClient";
import { ArtworksResponse } from "@/types/types";

export const getArtworks = async (): Promise<ArtworksResponse> => {
  try {
    const response = await axiosClient.get<ArtworksResponse>("/artworks");
    return response.data;
  } catch (error) {
    console.error("Error fetching artworks:", error);
    throw error;
  }
};
