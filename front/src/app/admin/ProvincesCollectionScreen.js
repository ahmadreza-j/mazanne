import React from "react";
import { useDispatch } from "react-redux";
import {
  httpCreateNewConvertedProvincesCollection,
  httpCreateNewConvertedCitiesCollection,
  httpDeleteConvertedProvincesCollection,
} from "../../store/actions/adminAction";

import ScreenContainer from "../shared/ScreenContainer";

const ProvincesCollectionScreen = () => {
  const dispatch = useDispatch();

  const createNewConvertedProvincesCollection = () => {
    if (window.confirm("are u sure?")) {
      dispatch(httpCreateNewConvertedProvincesCollection());
    }
  };

  const createNewConvertedCitiesCollection = () => {
    if (window.confirm("are u sure?")) {
      dispatch(httpCreateNewConvertedCitiesCollection());
    }
  };

  const deleteConvertedProvincesCollection = () => {
    if (window.confirm("are u sure?")) {
      dispatch(httpDeleteConvertedProvincesCollection());
    }
  };

  return (
    <ScreenContainer>
      <div>
        <label>ایجاد کالکشن استان های سفارشی شده ی من</label>
        <button onClick={createNewConvertedProvincesCollection}>
          ایجاد کالکشن
        </button>
      </div>
     <div>
        <label>ایجاد کالکشن شهر های سفارشی شده ی من</label>
        <button onClick={createNewConvertedCitiesCollection}>
          ایجاد کالکشن
        </button>
      </div>

      <div>
        <label>پاک کردن کالکشن شهرها و کشورها</label>
        <button onClick={deleteConvertedProvincesCollection}>
          پاک کردن کالکشن
        </button>
      </div>
    </ScreenContainer>
  );
};

export default ProvincesCollectionScreen;
