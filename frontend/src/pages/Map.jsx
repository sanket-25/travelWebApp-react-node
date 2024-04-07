import React from 'react';
import CommonSection from '../shared/CommonSection';
import Newsletter from "../shared/Newsletter";
import MasonryImagesGallery from '../components/Image-gallery/MasonryImagesGallery';
import Testimonials from '../components/Testimonial/Testimonials';
import{ Container, Row ,Col} from 'reactstrap';
import Subtitle from '../shared/Subtitle';

const Map = () => {
    return (
        <div>
            <CommonSection title={"Maps"}/>
            <iframe 
                title="Map" 
                src="http://localhost:3000/" 
                width="100%" 
                height="700px" 
                frameBorder="0" 
                scrolling="no"
            ></iframe>
             {/* ========== gallery section Start ============*/}
     <section>
  <Container>
    <Row>
      <Col lg='12'>
        <Subtitle subtitle={'Gallery'} className="gallery__subtitle" />
        <h2 className="gallery__title">Visit our Customers tour gallery</h2>
      </Col>
      <Col lg='12'>
        <MasonryImagesGallery/>
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
              <Subtitle subtitle={'Fans Love'}/>
              <h2 className="testomonial__title">What our fans say about us</h2>
            </Col>
            <Col lg='12'>
              <Testimonials/>
            </Col>
          </Row>
        </Container>
      </section>

     {/* ========== textimonial section end ============*/}
            <Newsletter/>
        </div>
    );
};

export default Map;
