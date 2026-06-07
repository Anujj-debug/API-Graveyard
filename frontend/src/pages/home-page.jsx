import HeroSection from "@/features/registry/components/hero-section";
import TrendingSection from "@/features/registry/components/trending-section";
import StatsSection from "@/features/registry/components/stats-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <TrendingSection />
    </>
  );
}