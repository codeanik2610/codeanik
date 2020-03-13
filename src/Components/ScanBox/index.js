import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import './style.scss';
import axios from 'axios';
import { TESSERACT_URL } from '../../constanst';

const ScanBox = props => {
  const { label = 'scan Now', data, getScanCode } = props;
  const [buttonLabel, setLabel] = useState();
  const [errMsg, seterrMsg] = useState();

  const scanNowHandler = async () => {
    setLabel('scanning...');
    if (data.data[0].url) {
      // let reqData = {
      //   url: data.data[0].url
      // };
      // console.log(reqData);
      // axios
      //   .post(`${TESSERACT_URL}getcode`, reqData)
      //   .then(response => {
      //     console.log(response);
      //     if (response.data.status === 200) {
      //       getQrCode(response.data.imagePath);
      //     }
      //   })
      //   .catch(function(error) {
      //     console.log(error);
      //   });
      let reqData = {
        url: data.data[0].url
      };
      axios
        .post(`${TESSERACT_URL}getQrcode`, reqData)
        .then(function(response) {
          if ((response.status = 200)) {
            setLabel(label);
            getScanCode(response);
          } else {
            setLabel(label);
            seterrMsg('Some thing went wrong');
          }
        })
        .catch(function(error) {
          setLabel(label);
          seterrMsg('Some thing went wrong');
        });
    }
  };

  const getQrCode = data => {
    let reqData = {
      url: data
    };
    axios
      .post(`${TESSERACT_URL}getQrcode`, reqData)
      .then(function(response) {
        if ((response.status = 200)) {
          setLabel(label);
          getScanCode(response);
        }
      })
      .catch(function(error) {
        // console.log(error);
      });
  };

  useEffect(() => {
    setLabel(label);
  }, [label]);

  return (
    <>
      {!data.showLoader && (
        <div className=" text-center">
          <Button
            className="btn btn-primary scan_button"
            type="button"
            onClick={scanNowHandler}
          >
            {buttonLabel}
          </Button>
          <div className="">{errMsg}</div>
        </div>
      )}
    </>
  );
};

export default ScanBox;
