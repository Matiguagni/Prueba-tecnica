"use client";

import { getArtworks } from "@/app/API/getArtworks";
import { type Artwork } from "@/types/types";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
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
    <Grid container spacing={6}>
      {artworks.map((artwork) => (
        <Grid item xs={12} sm={6} md={3} lg={4} key={artwork.id}>
          <Link href={`/artworks?id=${artwork.id}`} passHref>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                border: "1px  #ddd", // Borde personalizado con grosor y color
                // Bordes redondeados
                overflow: "hidden", // Para evitar que el contenido sobresalga
                boxShadow:
                  "0px 1px 0px 0px #ddd, 1px 0px 0px 0px #ddd, -1px 0px 0px 0px #ddd, 0px 0px 1px 1px #ddd ", // Sombras solo en los bordes superiores y laterales
              }}
            >
              <Box
                sx={{
                  height: "250px",
                  width: "100%",
                  backgroundImage: `url(${iiifUrl}/${artwork.image_id}/full/843,/0/default.jpg)`,
                  backgroundSize: "contain",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  marginTop: "1em",
                }}
              />
              {/* <CardMedia
                component="img"
                image={`${iiifUrl}/${artwork.image_id}/full/843,/0/default.jpg`}
                alt={artwork.title}
                style={{ height: "250px", width: "100%", objectFit: "contain" }}
              /> */}
              <CardContent
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "start",
                }}
                className="mt-3"
              >
                <Typography
                  variant="subtitle1"
                  className="mx-12 flex justify-center font-noto"
                >
                  {artwork.title}
                </Typography>
              </CardContent>
            </Card>
          </Link>
        </Grid>
      ))}
    </Grid>
  );
}
