export interface Artwork {
  id: number;
  title: string;
  artist_title: string;
  image_id: string; //UUID
}

export interface ArtworksResponse {
  data: Artwork[];
  config: {
    iiif_url: string;
  };
}

export interface ArtworkDetail {
  id: number;
  artist_display: string;
}
