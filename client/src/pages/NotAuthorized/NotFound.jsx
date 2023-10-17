import React from "react";
import MainLayout from "../../components/MainLayout";
import {images} from "../../constants"
const NotFound = () => {
  return (
    <MainLayout>
      <div className="bg-cover">
            <img src={images.pagenotfound} alt="404 Page not found" 
                className="object-cover"
            />
      </div>
    </MainLayout>
  );
};

export default NotFound;
