export interface Artwork {
  id: number;
  title: string;
  artist_title: string;
  image_id: string; //UUID
  alt_image_ids: string;
}

export interface ArtworksResponse {
  data: Artwork[];
  config: {
    iiif_url: string;
  };
  pagination: {
    current_page: number;
    limit: number;
    next_url: string;
    offset: number;
    total: number;
    total_pages: number;
  };
}

export interface ArtworkDetail {
  data: {
    id: number;
    artist_display: string;
    title: string;
    artist_title: string;
    image_id: string;
    exhibition_history: string;
    credit_line: string;
    date_start: number;
    date_end: number;
    description: string;
    dimensions: string;
    place_of_origin: string;
    publication_history: string;
  };
  config: {
    iiif_url: string;
  };
}
