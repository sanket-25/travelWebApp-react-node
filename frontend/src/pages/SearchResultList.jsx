import React, { useState, useEffect } from 'react';
import CommonSection from './../shared/CommonSection';
import { Container, Row, Col } from 'reactstrap';
import { useLocation } from 'react-router-dom';
import TourCard from '../shared/TourCard';
import Newsletter from './../shared/Newsletter'

const SearchResultList = () => {
  const location = useLocation();
  const [data, setData] = useState(location.state);

  useEffect(() => {
    setData(location.state);
  }, [location.state]);

  console.log(data);

  return (
    <>
      <CommonSection title={'Tour Search Result'} />
      <section>
        <Container>
          {/* Render your search result components here */}
          <Row>
            {data.length === 0 ? <h4> No tour found</h4> :
              data.map((tour) => (
                <Col lg="3" className="mb-4" key={tour.id}>
                  <TourCard tour={tour} />
                </Col>
              ))}
          </Row>
        </Container>
      </section>
      <Newsletter/>
    </>
  );
};

export default SearchResultList;
