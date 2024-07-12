"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getArtworksDetails } from "@/app/API/getAtworksDetail";
import { type ArtworkDetail } from "@/types/types";
import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import Navbar from "@/components/ui/navbar";

const ArtworkDetailPage = () => {
  const router = useSearchParams(); //para obtener el id de la url
  const id = router.get("id");

  console.log("id:", id);

  const [artworkDetail, setArtworkDetail] = useState<ArtworkDetail | null>(
    null,
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [iiifUrl, setIiifUrl] = useState<string>("");
  const [image_id, setImage_id] = useState<string>("");

  useEffect(() => {
    const fetchArtworkDetail = async () => {
      try {
        const data = await getArtworksDetails(Number(id)); // Convertir `id` a número entero
        console.log(data);
        setArtworkDetail(data);
        setIiifUrl(data.config.iiif_url);
        setImage_id(data.data.image_id);
      } catch (error) {
        console.error(`Error fetching artwork  details:`, error);
        setError(`Error fetching artwork  details. Please try again later.`);
      } finally {
        setLoading(false);
      }
    };

    void fetchArtworkDetail();
  }, [id]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!artworkDetail) {
    return <div>Obra de arte no encontrada</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="my-20 flex h-screen w-full justify-center align-middle">
        <Grid item key={artworkDetail.data.id}>
          <Card>
            <CardMedia
              component="img"
              width="25"
              height="50"
              image={`${iiifUrl}/${image_id}/full/425,/0/default.jpg`}
              alt={artworkDetail.data.title}
            />
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                className="flex justify-center align-middle"
              >
                {artworkDetail.data.title}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </div>

      <div className="mx-6 my-10 flex">
        <Typography variant="h1">Descripcion</Typography>
      </div>
    </div>
  );
};

export default ArtworkDetailPage;
