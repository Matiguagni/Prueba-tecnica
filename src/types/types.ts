export interface Artwork {
  id: number;
  title: string;
  artist_title: string;
  image_id: string;
}

export interface ArtworksResponse {
  data: Artwork[];
  config: {
    iiif_url: string;
  };
}
