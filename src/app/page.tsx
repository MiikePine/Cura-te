"use client";

import React from "react";
import Testimonials from "@terapias/components/Testimonials";
import Hero from "@terapias/components/hero";
import TherapiesGrid from "@terapias/components/TherapiesGrid";
import CallToAction from "@terapias/components/CallToAction";
import MapLandingPage from "@terapias/components/MapLandingPage"
import HowItWorks from "@terapias/components/HowItWorks";
import Stats from "@terapias/components/Stats";
import FeaturedPractitioners from "@terapias/components/FeaturedPractitioners";

export default function Home() {


  return (
    <div className="min-h-screen bg-[#F8F5F1] overflow-x-hidden">
    <Hero/>     
    <TherapiesGrid/> 
    <MapLandingPage/>
    <HowItWorks/>
    <Stats/>
    <FeaturedPractitioners/>
    <CallToAction/>
    <Testimonials/>
    </div>
  );

}