import React, { useRef, useState } from "react";
import { Col, Form, FormGroup } from "reactstrap";
import axios from 'axios';
import { BASE_URL } from "../utils/config";
import '../style/itinerarygenerator.css'; // Import CSS file
import CommonSection from '../shared/CommonSection';
import Newsletter from "../shared/Newsletter";
import MasonryImagesGallery from '../components/Image-gallery/MasonryImagesGallery';
import Testimonials from '../components/Testimonial/Testimonials';
import { Container, Row } from 'reactstrap';
import Subtitle from '../shared/Subtitle';

const ItineraryGenerator = () => {
  const sourceRef = useRef("");
  const destinationRef = useRef("");
  const startDateRef = useRef("");
  const endDateRef = useRef("");
  const durationRef = useRef("");
  const [itinerary, setItinerary] = useState(null);

  const generateItinerary = async () => {
    const source = sourceRef.current.value;
    const destination = destinationRef.current.value;
    const startDate = startDateRef.current.value;
    const endDate = endDateRef.current.value;
    const durationInDays = durationRef.current.value;

    if (source === "" || destination === "" || startDate === "" || endDate === "" || durationInDays === "") {
      return alert("All fields are required!");
    }

    try {
      const response = await axios.post(`${BASE_URL}/Itinerary/generate`, {
        source,
        destination,
        startDate,
        endDate,
        durationInDays
      });

      setItinerary(response.data.itineraryText);
    } catch (error) {
      console.error('Error generating itinerary:', error);
      alert('Error generating itinerary. Please try again.');
    }
  };

  const createItinerary = async () => {
    const source = sourceRef.current.value;
    const destination = destinationRef.current.value;
    const startDate = startDateRef.current.value;
    const endDate = endDateRef.current.value;
    const durationInDays = durationRef.current.value;

    if (source === "" || destination === "" || startDate === "" || endDate === "" || durationInDays === "" || !itinerary) {
      return alert("All fields are required!");
    }

    try {
      const response = await axios.post(`${BASE_URL}/Itinerary/create`, {
        source,
        destination,
        startDate,
        endDate,
        durationInDays,
        itineraryText: itinerary
      });

      console.log('Itinerary created:', response.data);
      alert('Itinerary created successfully!');
    } catch (error) {
      console.error('Error creating itinerary:', error);
      alert('Error creating itinerary. Please try again.');
    }
  };

  return (
    <Col lg="12">
      <CommonSection title={"Itinerary Generator"} />
      <div className="itinerary-generator">
        <Form className="form-container">
          <FormGroup className="form-group">
            <label htmlFor="source">Source</label>
            <input type="text" id="source" placeholder="Enter source" ref={sourceRef} />
          </FormGroup>
          <FormGroup className="form-group">
            <label htmlFor="destination">Destination</label>
            <input type="text" id="destination" placeholder="Enter destination" ref={destinationRef} />
          </FormGroup>
          <FormGroup className="form-group">
            <label htmlFor="startDate">Start Date</label>
            <input type="date" id="startDate" ref={startDateRef} />
          </FormGroup>
          <FormGroup className="form-group">
            <label htmlFor="endDate">End Date</label>
            <input type="date" id="endDate" ref={endDateRef} />
          </FormGroup>
          <FormGroup className="form-group">
            <label htmlFor="duration">Duration (in days)</label>
            <input type="number" id="duration" min="1" ref={durationRef} />
          </FormGroup>
          <button className="search-button" type="button" onClick={generateItinerary}>Generate</button>
          <button className="create-button" type="button" onClick={createItinerary}>Create Itinerary</button>
        </Form>
      </div>
      {/* Render itinerary */}
      <div className="itinerary-box">
        {itinerary && <pre>{itinerary}</pre>}
      </div>
      {/* ========== gallery section Start ============*/}
      <section>
        <Container>
          <Row>
            <Col lg='12'>
              <Subtitle subtitle={'Gallery'} className="gallery__subtitle" />
              <h2 className="gallery__title">Visit our Customers tour gallery</h2>
            </Col>
            <Col lg='12'>
              <MasonryImagesGallery />
            </Col>
          </Row>
        </Container>
      </section>

      {/* ========== gallary section end ============*/}
      {/* ========== testimonial section Start ============*/}
      <section>
        <Container>
          <Row>
            <Col lg='12'>
              <Subtitle subtitle={'Fans Love'} />
              <h2 className="testomonial__title">What our fans say about us</h2>
            </Col>
            <Col lg='12'>
              <Testimonials />
            </Col>
          </Row>
        </Container>
      </section>
      {/* ========== textimonial section end ============*/}
      <Newsletter />
    </Col>
  );
};

export default ItineraryGenerator;
