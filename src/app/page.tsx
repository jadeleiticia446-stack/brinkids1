"use client";

import { useState } from "react";
import Header from "@/components/Header";
import TrustBar from "@/components/TrustBar";
import Hero from "@/components/Hero";
import ImageGallery from "@/components/ImageGallery";
import Benefits from "@/components/Benefits";
import HowItWorks from "@/components/HowItWorks";
import Specs from "@/components/Specs";
import SocialProof from "@/components/SocialProof";
import Guarantees from "@/components/Guarantees";
import Footer from "@/components/Footer";
import CheckoutModal from "@/components/CheckoutModal";

export default function HomePage() {
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState("azul");
  const [quantity, setQuantity] = useState(1);

  const handleBuyClick = (color: string, qty: number) => {
    setSelectedColor(color);
    setQuantity(qty);
    setCheckoutOpen(true);
  };

  return (
    <>
      <Header />
      <TrustBar />
      <main>
        <Hero onBuyClick={handleBuyClick} />
        <ImageGallery />
        <Benefits />
        <HowItWorks />
        <Specs />
        <SocialProof />
        <Guarantees />
      </main>
      <Footer />

      <CheckoutModal
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        color={selectedColor}
        quantity={quantity}
      />
    </>
  );
}
