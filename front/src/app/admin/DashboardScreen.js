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
      </div>
    </ScreenContainer>
  );
};

export default DashboardScreen;
