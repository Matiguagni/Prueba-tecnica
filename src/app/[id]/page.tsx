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
  LinearProgress,
  Typography,
} from "@mui/material";
import Navbar from "@/components/ui/navbar";
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
                objectFit: "contain",
                maxHeight: 300,
              }}
            />
          </Card>
          <div className="ml-16 mt-16 flex gap-20 text-justify">
            <div className="flex flex-col">
              <Typography variant="body2" className="mb-2">
                <strong>Title:</strong> {artworkDetail.data.title}
              </Typography>
              <Typography variant="body2" className="mb-2">
                <strong>Origin:</strong> {artworkDetail.data.place_of_origin}
              </Typography>
              <Typography variant="body2" className="mb-2">
                <strong>Was painted:</strong> {artworkDetail.data.date_start} -{" "}
                {artworkDetail.data.date_end}
              </Typography>

              <Typography variant="body2" className="mb-2">
                <strong>Artist:</strong> {artworkDetail.data.artist_display}
              </Typography>
              <Typography variant="body2" className="mb-2">
                <strong>Credit:</strong> {artworkDetail.data.credit_line}
              </Typography>
              <Typography variant="body2" className="mb-2">
                <strong>Dimensions:</strong> {artworkDetail.data.dimensions}
              </Typography>
            </div>
          </div>
        </Box>
      </Container>
      <Footer />
    </div>
  );
};

export default ArtworkDetailPage;
