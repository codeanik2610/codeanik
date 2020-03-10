import React, { useState, useEffect } from 'react';
import PropTypes from "prop-types";
import './style.scss';
import Loader from 'react-loader-spinner';
import { Carousel, Container, Row, Col } from 'react-bootstrap';

const Slider = (props) => {
  const { sliderData, itemsToShow, imageClick } = props;
  const [computedSliderData, setcomputedSliderData] = useState([]);
  const [imageId, setImageId] = useState(1);

  useEffect(() => {
    let count = 0;
    let itemsCount = itemsToShow;
    let sliderArray = [];
    const finalSlidarArry = [];
    if (!sliderData.showLoader) {
      sliderData.data.forEach((element, i) => {
        if (i < itemsCount) {
          sliderArray.push(element);
          finalSlidarArry[count] = sliderArray;
        } else {
          count++;
          itemsCount = itemsCount * 2;
          sliderArray = [];
          sliderArray.push(element);
          finalSlidarArry[count] = sliderArray;
        }
      });
      setcomputedSliderData([...finalSlidarArry]);
    }
  }, [sliderData, itemsToShow]);

  const getImgaeDetails = (e) => {
    imageClick(e.target.id);
    setImageId(e.target.id);
  }

  return <>
    <div className="slider-container">
      {sliderData.showLoader && <div className="text-center"><Loader
        type="Rings"
        color="#000000"
        height={100}
        width={100}
      /></div>}
      {!sliderData.showLoader && <Carousel>
        {computedSliderData.length > 0 && computedSliderData.map((each, i) => (
          <Carousel.Item key={i}>
            <Container>
              <Row float="center">
                {each.map((eachSlide) => (
                  <Col xs={3} className="text-center" key={eachSlide.id}>
                    <img
                      className={`${imageId.toString() === (eachSlide.id).toString() ? 'activeSlider' : ''} item`}
                      src={eachSlide.url}
                      alt={eachSlide.title}
                      id={eachSlide.id}
                      onClick={getImgaeDetails}
                    /></Col>))}
              </Row>
            </Container>
          </Carousel.Item>))}
      </Carousel>}
    </div>
  </>
}

Slider.prototype = {
  sliderData: PropTypes.array && PropTypes.element.isRequired,
  itemsToShow: PropTypes.number && PropTypes.element.isRequired,
  imageClick: PropTypes.element.isRequired,
}
export default Slider;