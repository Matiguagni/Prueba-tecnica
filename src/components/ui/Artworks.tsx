"use client";

import { getArtworks } from "@/app/API/getArtworks";
import { getArtworksDetails } from "@/app/API/getAtworksDetail";
import { searchArtworks } from "@/app/API/searchArtworks";
import { type Artwork } from "@/types/types";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Input,
  LinearProgress,
  Typography,
} from "@mui/material";
import axios from "axios";
import Link from "next/link";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";

export default function Artworks() {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [iiifUrl, setIiifUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [busqueda, setBusqueda] = useState("");
  const [searchArtwork, setSearchArtwork] = useState<Artwork[]>([]);
  const [image_id, setImage_id] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getArtworks();

        setArtworks(data.data);
        console.log("dataFetch", data.data);

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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = await searchArtworks(busqueda);
      setSearchArtwork(data.data);
      console.log("datasearch: ", data.data);
    } catch (error) {}
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBusqueda(e.target.value);
    console.log(e.target.value);
  };

  return (
    <div>
      <div className="m-10 flex justify-center">
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            name=""
            id="1"
            placeholder="Search artwork..."
            onChange={handleChange}
          />
          <Button type="submit">Search</Button>
        </form>
      </div>
      {searchArtwork.length === 0 ? (
        <p>no hay resultados</p>
      ) : (
        searchArtwork.map((artwork) => {
          return (
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
                      backgroundImage: `url(${iiifUrl}/${artwork.alt_image_ids}/full/843,/0/default.jpg)`,
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
          );
        })
      )}
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
    </div>
  );
}
