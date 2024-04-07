import React from 'react';
import { Container, Row } from 'reactstrap';
import CommonSection from '../shared/CommonSection';
import WeatherBar from "../shared/weatherbar"; 
import Newsletter from "../shared/Newsletter";


const WeatherPage = () => {
  return (
    <>
      <CommonSection title={"Weather Forecasts"} />
      <section>
        <Container>
          <Row>
            <WeatherBar /> {/* Add your WeatherBar component here */}
          </Row>
        </Container>
      </section>
      <section className="pt-0">
        {/* Render weather forecasts here */}
      </section>
      <Newsletter/>
    </>
  );
}

export default WeatherPage;
