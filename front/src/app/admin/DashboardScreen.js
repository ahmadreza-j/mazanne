import React from "react";
import { Link } from "react-router-dom";
import ScreenContainer from "../shared/ScreenContainer";
const DashboardScreen = () => {
  return (
    <ScreenContainer>
      <div>
        <div>
          <Link to="/provinces-collection">شهرها و استان ها</Link>
        </div>
        <div>
          <Link to="/units-collection">واحدهای اندازه گیری</Link>
        </div>
        <div>
          <Link to="/parent-fields-collection">دسته بندی های پدر</Link>
        </div>
        <div>
          <Link to="/fields-collection">حوزه ها و دسته بندی ها</Link>
        </div>
      </div>
    </ScreenContainer>
  );
};

export default DashboardScreen;
