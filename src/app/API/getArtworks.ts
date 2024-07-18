import axiosClient from "./axiosClient";
import { type ArtworksResponse } from "@/types/types";

//METODO GET PARA LAS ARTWORKS

export const getArtworks = async (
  page: number,
  limit: number,
): Promise<ArtworksResponse> => {
  try {
    const response = await axiosClient.get<ArtworksResponse>(
      `/artworks?page=${page}&limit=${limit}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching artworksasd:", error);
    throw error;
  }
};
