import React from "react";
import { Container, Row, Col } from "reactstrap";
import Subtitle from "../shared/Subtitle";
import '../style/About.css';
import worldImg from "../assets/images/world.png"
import logo1 from "../assets/images/logo.png"
import Newsletter from "../shared/Newsletter";
import Contact from "./Contact";

const About = () => {
  return (
    <><section className="about">
      <Container>
        <Row>
          <Col lg="6">
            <div className="hero__content">
              <div className="hero__subtitle d-flex align-items-center">
                <Subtitle subtitle={"About Us"} />
                <img src={worldImg} alt="" />
              </div>
              <h1>
                Traveling Opens The Door To Creating{" "}
                <span className="highlight">Memories</span>
              </h1>
              <p>
             
Welcome to Travel World! We make travel easy and unforgettable. Our mission? To inspire, plan, and create memories. With our team of enthusiasts, we provide tips and guides for all travelers. Join us in exploring the globe and making lifelong memories. Thank you for choosing Travel World. Happy travels!


              </p>
            </div>
          </Col>
          <div className="about__image d-flex align-items-center">
            <img src={logo1} height={250} width={250} alt="" />
          </div>
        </Row>
      </Container>
    </section>
    <Contact/>
    <Newsletter /></>
  );
};

export default About;
