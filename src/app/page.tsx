"use client";

import Navbar from "@/components/ui/navbar";
import { Container, Typography } from "@mui/material";
import Footer from "@/components/footer";

import Artworks from "@/components/ui/Artworks";

export default function HomePage() {
  return (
    <div key="1">
      <Navbar />
      <div className="mt-2 border-t border-gray-200"></div>

      <Container fixed>
        <Typography
          className="mb-8 mt-10 flex justify-start font-noto font-bold"
          variant="h2"
        >
          OUR ART COLECTION
        </Typography>
        <div className="mb-16 flex w-3/4">
          <Typography className="font-noto font-normal" variant="h6">
            This is our 2024 collection with the most impressive works of art in
            the world. To see more detailed information about each artwork,
            select the one you want.
          </Typography>
        </div>
        <Artworks />
      </Container>
      <Footer />
    </div>
  );
}
