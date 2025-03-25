// app/page.tsx

import Header from "@/components/header/Header";
import HeroBanner from "@/components/home/HeroBanner";
import WorkflowSection from "@/components/home/WorkFlowSection";
import FeatureSection from "@/components/home/FeatureSection";
import FeatureLeftSection from "@/components/home/FeatureLeftSection";
import StateSection from "@/components/home/StateSection";
import SignUpCTASection from "@/components/home/SignUpCTASection";
import Footer from "@/components/home/Footer";

export default function Home() {
  return (
    <main>
      <Header />
      <HeroBanner />
      <StateSection />
      <WorkflowSection />
      <FeatureSection />
      <FeatureLeftSection />
      <SignUpCTASection />
      <Footer />
    </main>
  );
}
