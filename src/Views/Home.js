import React, { useEffect, useState } from 'react';
import Slider from '../Components/Slider';
import Description from '../Components/Description';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../Store/Actions/sliderAction';

const Home = () => {
  const [sliderData, setsliderData] = useState({
    showLoader: true,
    data: []
  });
  const [descriptionData, setdescriptionData] = useState({ showLoader: true, data: [] });
  const [imageCount, setImageCount] = useState(4);
  const dispatch = useDispatch();
  const allSlides = useSelector(state => {
    return state.sliderReducers.slider;
  });
  const slideDescription = useSelector(state => {
    return state.sliderReducers.sliderDesc;
  });
  //const size = useWindowSize();
  // useEffect(() => {
  //   if (size.width < 992) {
  //     setImageCount(2);
  //   } else {
  //     setImageCount(4);
  //   }
  // }, [size]);

  useEffect(() => {
    dispatch(actions.getAllSlides())
  }, [dispatch]);


  useEffect(() => {
    setsliderData(allSlides);
    dispatch(actions.getImageDetails(1))
  }, [allSlides, dispatch]);

  useEffect(() => {
    setdescriptionData(slideDescription);
  }, [slideDescription]);

  const getImageDetails = (imageId) => {
    setdescriptionData({ ...descriptionData, showLoader: true })
    dispatch(actions.getImageDetails(imageId))
  }

  return <>
    <div className="header mb-3 pt-3"><span className="text-border h3">Images</span></div>
    <div className="pb-5 pt-3"><Slider
      sliderData={sliderData}
      itemsToShow={imageCount}
      imageClick={getImageDetails}
    />
    </div>
    <div className="slider-section">
      <div className="header mb-3 pt-3"><span className="text-border h3">Details</span></div>
      <div className="pb-3 pt-3">
        <Description
          descriptionData={descriptionData}
        />
      </div>
    </div>
  </>;
}

// Hook
function useWindowSize() {
  const isClient = typeof window === 'object';

  function getSize() {
    return {
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined
    };
  }

  const [windowSize, setWindowSize] = useState(getSize);

  useEffect(() => {
    if (!isClient) {
      return false;
    }

    function handleResize() {
      setWindowSize(getSize());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}
export default Home;