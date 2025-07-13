import AboutSection from "../../components/AboutSection/AboutSection";
import Banner from "../../components/Banner";
import FeaturedSection from "../../components/FeaturedSection/FeaturedSection";
import Plants from "../../components/Home/Plants";
import LatestForumsSection from "../../components/LatestForumsSection/LatestForumsSection";
import NewsletterSubscribe from "../../components/NewsletterSubscribe/NewsletterSubscribe";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <LatestForumsSection />
      <FeaturedSection />
      <NewsletterSubscribe />
      <AboutSection />
    </div>
  );
};

export default Home;
