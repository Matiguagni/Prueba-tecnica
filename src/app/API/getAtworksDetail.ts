import axiosClient from "./axiosClient";
import { type ArtworkDetail } from "@/types/types";

//METODO GET PARA LAS ARTWORKS

export const getArtworksDetails = async (
  id: number,
): Promise<ArtworkDetail> => {
  try {
    const response = await axiosClient.get<ArtworkDetail>(`/artworks/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching the artwork con el id ${id} details:", error);
    throw error;
  }
};
