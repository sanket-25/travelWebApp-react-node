import React from 'react';
import ServiceCard from "./ServiceCard";
import { Col } from "reactstrap";

import weathering from '../assets/images/weather.png';
import guideImg from '../assets/images/guide.png';
import customizationImg from '../assets/images/customization.png';

// eslint-disable-next-line no-unused-vars
const serviceData = [
  {
    imgUrl: weathering,
    title: "Calculate Weather",
    desc: "Lorem ipsum dolor sit amet, consectetur.",
  },
  {
    imgUrl: guideImg,
    title: "Best Tour Guide",
    desc: "Lorem ipsum dolor sit amet, consectetur.",
  },
  {
    imgUrl: customizationImg,
    title: "Customization",
    desc: "Lorem ipsum dolor sit amet, consectetur.",
  }
];

const ServiceList = () => {
  return (
    <>
      {serviceData.map((item, index) => (
        <Col lg="3" key={index}>
          <ServiceCard item={item} />
        </Col>
      ))}
    </>
  );
};

export default ServiceList;
