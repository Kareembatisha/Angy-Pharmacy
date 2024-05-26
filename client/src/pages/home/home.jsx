import React from 'react';
import Poster from '../../components/poster/poster';
import Slider from '../../components/slider/slider';
import ServiscesPoster from '../../components/serviscesPoster/serviscesPoster';
import PrescriptionPoster from '../../components/PrescriptionPoster/PrescriptionPoster';
import BestSellersComponent from '../../components/BestSellers/BestSellers';

const Home = () => {
  return (
    <div>
      <Poster></Poster>
      <Slider></Slider>
      <ServiscesPoster></ServiscesPoster>
      <BestSellersComponent></BestSellersComponent>
      {/* <PrescriptionPoster></PrescriptionPoster> */}
    </div>
  );
};

export default Home;