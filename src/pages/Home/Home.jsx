import { Helmet } from "react-helmet-async";
import AboutSection from "../../components/AboutSection/AboutSection";
import Banner from "../../components/Banner";
import FeaturedClasses from "../../components/FeaturedClasses/FeaturedClasses";
import FeaturedSection from "../../components/FeaturedSection/FeaturedSection";
import LatestForumsSection from "../../components/LatestForumsSection/LatestForumsSection";
import NewsletterSubscribe from "../../components/NewsletterSubscribe/NewsletterSubscribe";
import TeamSection from "../../components/TeamSection/TeamSection";
import TestimonialsCarousel from "../../components/TestimonialsCarousel/TestimonialsCarousel";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Home | FitSphere</title>
      </Helmet>
      <Banner></Banner>
      <FeaturedClasses />
      <LatestForumsSection />
      <FeaturedSection />
      <TeamSection />
      <TestimonialsCarousel />
      <NewsletterSubscribe />
      <AboutSection />
    </div>
  );
};

export default Home;
