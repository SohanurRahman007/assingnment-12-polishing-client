import Banner from "../../components/Banner";
import Plants from "../../components/Home/Plants";
import LatestForumsSection from "../../components/LatestForumsSection/LatestForumsSection";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <LatestForumsSection />
      <Plants />
    </div>
  );
};

export default Home;
