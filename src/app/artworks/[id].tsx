import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getArtworksDetails } from "../API/getAtworksDetail";
import { type ArtworkDetail } from "@/types/types";
import { Typography } from "@mui/material";

const ArtworkDetailPage = () => {
  const router = useRouter();
  const { id } = router.query as { id: string };
  const [artworkDetail, setArtworkDetail] = useState<ArtworkDetail | null>(
    null,
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

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
      <Typography variant="h3">{artworkDetail.artist_display}</Typography>
      <Typography variant="body1">{artworkDetail.id}</Typography>
      {/* Agrega aquí cualquier otro detalle que desees mostrar */}
    </div>
  );
};

export default ArtworkDetailPage;
