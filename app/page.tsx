'use client';

import CookieConsentBanner from "../components/CookieConsentBanner";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <CookieConsentBanner />
    </>
  );
}