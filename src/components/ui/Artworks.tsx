import { getArtworks } from "@/app/API/getArtworks";
import { Artwork } from "@/types/types";
import {
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid,
  LinearProgress,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Artworks() {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [iiifUrl, setIiifUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getArtworks();
        console.log(data.config);

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
    return <LinearProgress />;
  }

  return (
    <Grid container spacing={8}>
      {artworks.map((artwork) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={artwork.id}>
          <Link href={`/artworks/${artwork.id}`} passHref>
            <Card>
              <CardMedia
                component="img"
                height="250"
                image={`${iiifUrl}/${artwork.image_id}/full/843,/0/default.jpg`}
                alt={artwork.title}
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  className="flex justify-center align-middle"
                >
                  {artwork.title}
                </Typography>
                <Typography
                  variant="body2"
                  component="p"
                  color="text.secondary"
                ></Typography>
              </CardContent>
            </Card>
          </Link>
        </Grid>
      ))}
    </Grid>
  );
}
