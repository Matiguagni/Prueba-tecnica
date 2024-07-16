"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getArtworksDetails } from "@/app/API/getAtworksDetail";
import { type ArtworkDetail } from "@/types/types";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  LinearProgress,
  Typography,
} from "@mui/material";
import Navbar from "@/components/ui/navbar";
import { Height } from "@mui/icons-material";
import Footer from "@/components/footer";

const ArtworkDetailPage = () => {
  const router = useSearchParams(); //para obtener el id de la url
  const id = router.get("id");

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
    return <LinearProgress />;
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
      <Container>
        <Box display="flex" flexDirection="column" alignItems="center" mt={8}>
          <Card
            style={{ width: "100%" }}
            sx={{
              border: "none",
              boxShadow: "none",
            }}
          >
            <CardMedia
              component="img"
              width="100%"
              height="auto"
              image={`${iiifUrl}/${image_id}/full/843,/0/default.jpg`}
              alt={artworkDetail.data.title}
              sx={{
                objectFit: "contain", // Ajusta el tamaño de la imagen para que quepa en el contenedor
                maxHeight: 300, // Altura mínima para la imagen
              }}
            />
            <CardContent></CardContent>
          </Card>
          <div className="ml-16 flex justify-center gap-20">
            <ul className="text-left">
              <li className="mb-2">
                <Typography variant="body2">
                  <strong>Title:</strong>{" "}
                </Typography>
              </li>
              <li className="mb-2">
                <Typography variant="body2">
                  <strong>Origin:</strong>{" "}
                </Typography>
              </li>
              <li className="mb-2">
                <Typography variant="body2">
                  <strong>Was painted:</strong>
                </Typography>
              </li>
              <li className="mb-2">
                <Typography variant="body2">
                  <strong>Artist:</strong>{" "}
                </Typography>
              </li>
              <li className="mb-2">
                <Typography variant="body2">
                  <strong>Credit: </strong>
                </Typography>
              </li>
              <li className="mb-2">
                <Typography variant="body2">
                  <strong>Dimensions:</strong>
                </Typography>
              </li>
            </ul>
            <ul className="">
              <li className="mb-2">
                <Typography variant="body2">
                  {artworkDetail.data.title}
                </Typography>
              </li>
              <li className="mb-2">
                <Typography variant="body2">
                  {artworkDetail.data.place_of_origin}
                </Typography>
              </li>
              <li className="mb-2">
                <Typography variant="body2">
                  {artworkDetail.data.date_start} -{" "}
                  {artworkDetail.data.date_end}
                </Typography>
              </li>
              <li className="mb-2">
                <Typography variant="body2">
                  {artworkDetail.data.artist_display}
                </Typography>
              </li>
              <li className="mb-2">
                <Typography variant="body2">
                  {artworkDetail.data.credit_line}
                </Typography>
              </li>
              <li className="mb-2">
                <Typography variant="body2">
                  {artworkDetail.data.dimensions}
                </Typography>
              </li>
            </ul>
          </div>
        </Box>
      </Container>
      <Footer />
    </div>
  );
};

export default ArtworkDetailPage;
