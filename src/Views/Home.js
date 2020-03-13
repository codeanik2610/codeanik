import React, { useEffect, useState } from 'react';
import Slider from '../Components/Slider';
import Description from '../Components/Description';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../Store/Actions/sliderAction';
import QrCode from '../Components/QrCode';
import ScanBox from '../Components/ScanBox';

const Home = () => {
  const [sliderData, setsliderData] = useState({
    showLoader: true,
    data: []
  });
  const [descriptionData, setdescriptionData] = useState({
    showLoader: true,
    data: []
  });
  const [imageCount, setImageCount] = useState(4);
  const [scannedCode, setscannedCode] = useState('');
  const dispatch = useDispatch();
  const allSlides = useSelector(state => {
    return state.sliderReducers.slider;
  });
  const slideDescription = useSelector(state => {
    return state.sliderReducers.sliderDesc;
  });

  useEffect(() => {
    setscannedCode('');
    dispatch(actions.getAllSlides());
  }, [dispatch]);

  useEffect(() => {
    setsliderData(allSlides);
    setscannedCode('');
    dispatch(actions.getImageDetails(1));
  }, [allSlides, dispatch]);

  useEffect(() => {
    setscannedCode('');
    setdescriptionData(slideDescription);
  }, [slideDescription]);

  const getImageDetails = imageId => {
    setdescriptionData({ ...descriptionData, showLoader: true });
    dispatch(actions.getImageDetails(imageId));
  };
  const getScanCode = val => {
    setscannedCode(val.data.qrCode);
  };
  return (
    <>
      <div className="header mb-3 pt-3">
        <span className="text-border h3">Images</span>
      </div>
      <div className="pb-5 pt-3">
        <Slider
          sliderData={sliderData}
          itemsToShow={imageCount}
          imageClick={getImageDetails}
        />
      </div>
      <div className="slider-section">
        <div className="header mb-3 pt-3">
          <span className="text-border h3">Details</span>
        </div>
        <div className="pb-3 pt-3 description-wrapper">
          <Description descriptionData={descriptionData} />
          <ScanBox
            data={descriptionData}
            label="scan now"
            getScanCode={getScanCode}
          />
        </div>
        <div className="mb-5 text-center">
          <QrCode scannedCode={scannedCode} />
        </div>
      </div>
    </>
  );
};

export default Home;
