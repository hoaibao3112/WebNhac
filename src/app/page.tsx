import Greeting from "@/components/home/Greeting";
import BannerCarousel from "@/components/home/BannerCarousel";
import CategoryGrid from "@/components/home/CategoryGrid";
import TrendingSongs from "@/components/home/TrendingSongs";
import ChartSection from "@/components/home/ChartSection";
import FeaturedArtists from "@/components/home/FeaturedArtists";
import Footer from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <div className="px-8 py-6">
      {/* Greeting */}
      <Greeting />

      {/* Banner Carousel */}
      <BannerCarousel />

      {/* Trending Songs - Data từ Backend API */}
      <TrendingSongs />

      {/* Category Grid */}
      <CategoryGrid />

      {/* Chart Section */}
      <ChartSection />

  {/* Featured Artists */}
  <FeaturedArtists />

      {/* Footer */}
      <Footer />
    </div>
  );
}
