import { getArtworks } from "@/app/API/getArtworks";
import { Artwork } from "@/types/types";
import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { useState, useEffect } from "react";

export default function Artworks() {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [iiifUrl, setIiifUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getArtworks();
        setArtworks(data.data);
        setIiifUrl(data.config.iiif_url);
      } catch (error) {
        console.error("error fetching artworks", error);
      } finally {
        setLoading(false);
      }
    };

    void fetchData();
  }, []);

  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <Grid container spacing={4}>
      {artworks.map((artwork) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={artwork.id}>
          <Card>
            <CardMedia
              component="img"
              height="250"
              image={`${iiifUrl}/${artwork.image_id}/full/843,/0/default.jpg`}
              alt={artwork.title}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {artwork.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {artwork.artist_title}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
