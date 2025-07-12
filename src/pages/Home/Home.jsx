import Banner from "../../components/Banner";
import FeaturedSection from "../../components/FeaturedSection/FeaturedSection";
import Plants from "../../components/Home/Plants";
import LatestForumsSection from "../../components/LatestForumsSection/LatestForumsSection";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <LatestForumsSection />
      <FeaturedSection />
    </div>
  );
};

export default Home;
