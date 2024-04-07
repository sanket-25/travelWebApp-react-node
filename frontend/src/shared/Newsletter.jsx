import React, { useState } from 'react';
import "./Newsletter.css";

import { Container, Row, Col } from 'reactstrap';
import MaleTourist from "../assets/images/male-tourist.png";

const Newsletter = () => {
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = () => {
    // Add logic here to handle subscription (e.g., send request to server)
    // For demonstration, just setting subscribed to true after clicking Subscribe button
    setSubscribed(true);
  };

  return (
    <section className='newsletter'>
      <Container>
        <Row>
          <Col lg="6">
            <div className="newsletter__content">
              <h2>Subscribe to get Useful Traveling Information</h2>

              <div className="newsletter__input">
                <input type="email" placeholder='Enter Your Email' />
                <button className='btn newsletter__btn' onClick={handleSubscribe}>Subscribe</button>
              </div>

              {subscribed ? <p>Subscribed successfully!</p> : null}

              <p>Thank you for subcribing stay tuned.</p>
            </div>
          </Col>
          <Col lg="6">
            <div className="newsletter__img">
              <img src={MaleTourist} alt="" />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Newsletter;
