import React from 'react';
import PropTypes from "prop-types";
import './style.scss';
import Loader from 'react-loader-spinner';
import { Row, Col } from 'react-bootstrap';

const Description = (props) => {
  const { descriptionData } = props;
  return <>
    {descriptionData.showLoader && <div className="text-center"><Loader
      type="Rings"
      color="#000000"
      height={100}
      width={100}
    /></div>}
    {!descriptionData.showLoader > 0 && descriptionData.data.map((each, i) => (
      <div className="description-wrapper" key={i}>
        <Row>
          <Col xs={12} md={2}>
            <div className="image-container">
              <img className="image" src={each.url} alt={each.title} />
            </div>
          </Col>
          <Col xs={12} md={10}>
            <h5>{each.title}</h5>
            <p>Quantity: <strong>{each.quantity}</strong></p>
            <h5>Description:</h5>
            <p>{each.description}</p>
          </Col>
        </Row>
        <Row>
          <div className="col-12">
            <h5>Features :</h5>
            <ol>
              {each.features.map((each, i) => (<li key={i}>{each}</li>))}

            </ol>
          </div>
        </Row>
      </div>))}
  </>;
}

Description.prototype = {
  descriptionData: PropTypes.array && PropTypes.element.isRequired,
}
export default Description;