import Layout from "@/components/layout";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import RestaurantList from "@/components/RestaurantList";
const Explore = () => {
  return (
    <Layout>
      <div className="bannerWrapper">
        <div className="banner pageHeading explorePage">
          <h1>Restaurants</h1>
        </div>
        <div className="overlayImage"></div>
      </div>
      <RestaurantList />
    </Layout>
  );
};

export default Explore;
