// pages/Home/LandingPage.jsx
import Hero from "../../Components/home/Hero";
import PulseDivider from "../../Components/home/PulseDivider";
import Specializations from "../../Components/home/Specializations";
import Services from "../../Components/home/Services";
import HowItWorks from "../../Components/home/HowItWorks";
import Testimonials from "../../Components/home/Testimonials";
import CTA from "../../Components/home/CTA";
// import Footer from "../../Components/home/Footer";

export default function LandingPage() {
  return (
    <div className="font-['IBM_Plex_Sans']">
      <Hero />
      <PulseDivider />
      <Specializations />
      <Services />
      <PulseDivider tone="dark" />
      <HowItWorks />
      <Testimonials />
      <CTA />
      {/* <Footer /> */}
    </div>
  );
}
