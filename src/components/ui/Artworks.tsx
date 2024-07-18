"use client";

import { getArtworks } from "@/app/API/getArtworks";
import { searchArtworks } from "@/app/API/searchArtworks";
import { type Artwork } from "@/types/types";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Input,
  LinearProgress,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useState, useEffect, ChangeEvent, FormEvent, use } from "react";

export default function Artworks() {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [iiifUrl, setIiifUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [busqueda, setBusqueda] = useState("");
  const [searchArtwork, setSearchArtwork] = useState<Artwork[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(12);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getArtworks(page, limit);

        setArtworks(data.data);
        setIiifUrl(data.config.iiif_url);
        setTotalPages(data.pagination.total_pages);
      } catch (error) {
        console.error("error fetching artworks", error);
      } finally {
        setLoading(false);
      }
    };

    void fetchData();
  }, [page]);

  if (loading) {
    return <LinearProgress />;
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = await searchArtworks(busqueda);
      setSearchArtwork(data.data);
    } catch (error) {}
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBusqueda(e.target.value);
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
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
        <></>
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
                  border: "1px  #ddd",
                  overflow: "hidden",
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
      <Box className="mt-8 flex w-full justify-center">
        <Button disabled={page === 1} onClick={handlePrevPage}>
          Previous
        </Button>
        <Typography
          variant="body2"
          className="flex items-center align-middle font-noto"
        >
          Page {page} of {totalPages}
        </Typography>
        <Button disabled={page === totalPages} onClick={handleNextPage}>
          Next
        </Button>
      </Box>
    </div>
  );
}
