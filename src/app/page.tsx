"use client";

import Navbar from "@/components/ui/navbar";
import { Button, Container, Typography } from "@mui/material";
import Link from "next/link";
import Artworks from "@/components/ui/Artworks";

export default function HomePage() {
  return (
    <div key="1" className="flex w-screen flex-col justify-center">
      <Navbar />
      <Container fixed>
        <Typography className="flex justify-center" variant="h3">
          ART COLECTION
        </Typography>
        <Artworks />
      </Container>
    </div>
  );
}
