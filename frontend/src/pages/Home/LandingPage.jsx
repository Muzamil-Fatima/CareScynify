// pages/Home/LandingPage.jsx
import Hero from "../../components/home/Hero";
import PulseDivider from "../../components/home/PulseDivider";
import Specializations from "../../components/home/Specializations";
import Services from "../../components/home/Services";
import HowItWorks from "../../components/home/HowItWorks";
import Testimonials from "../../components/home/Testimonials";
import CTA from "../../components/home/CTA";
// import Footer from "../../components/home/Footer";

export default function LandingPage() {
  return (
    <div className=" w-full overflow-x-hidden">
      <Hero />
      <PulseDivider />
      <Specializations />
      <Services />
      <PulseDivider tone="dark" />
      <HowItWorks />
      <Testimonials />
      <CTA />
    </div>
  );
}
