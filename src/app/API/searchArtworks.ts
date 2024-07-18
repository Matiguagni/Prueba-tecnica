import axiosClient from "./axiosClient";
import { ArtworkDetail, Artwork, type ArtworksResponse } from "@/types/types";

export const searchArtworks = async (
  busqueda: string,
): Promise<ArtworksResponse> => {
  try {
    const response = await axiosClient.get<ArtworksResponse>(
      `/artworks/search?q=${busqueda}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error searching artwork:", error);
    throw error;
  }
};
