import React from 'react'
import '../style/home.css'

import{ Container, Row ,Col} from 'reactstrap';
import heroImg from '../assets/images/hero-img01.jpg'
import heroImg02 from '../assets/images/hero-img02.jpg'
import heroVideo from '../assets/images/hero-video.mp4'
import worldImg from '../assets/images/world.png'
import Subtitle from '../shared/Subtitle';
import experienceImg from '../assets/images/experience.png'

import SearchBar from '../shared/SearchBar';
import ServiceList from '../services/ServiceList';
import FeaturedTourList from '../components/Featured-tours/FeaturedTourList';
import MasonryImagesGallery from '../components/Image-gallery/MasonryImagesGallery';
import Testimonials from '../components/Testimonial/Testimonials';
import Newsletter from "../shared/Newsletter"



const Home = () => {
  return <>
    {/* ============hero section start ============= */}
    <section>
      <Container>
        <Row>
          <Col lg='6'>
            <div className = "hero__content">
              <div className= "hero__subtitle d-flex align-items-center">
                <Subtitle subtitle= {'know Before You Go'}/>
                <img src={worldImg} alt= ""/>
              </div>
              <h1>Traveling open the door to creating <span className="highLight">memories</span></h1>
              <p>
             
             Welcome to Travel World! We make travel easy and unforgettable. Our mission? To inspire, plan, and create memories. With our team of enthusiasts, we provide tips and guides for all travelers. Join us in exploring the globe and making lifelong memories. Thank you for choosing Travel World. Happy travels!
             
             
                           </p>
            </div>
          </Col>

          <Col lg='2'>
            <div className="hero__img-box">
              <img src = {heroImg} alt="" />
            </div>
          </Col>
          <Col lg='2'>
            <div className="hero__img-box" mt-4>
              <video src = {heroVideo} alt="Hero Video" />
            </div>
          </Col>
          <Col lg='2'>
            <div className="hero__img-box" mt-5>
              <img src = {heroImg02} alt="" />
            </div>
          </Col>
          <SearchBar/>
        </Row>
      </Container>
    </section>

     {/* ============hero section end ============= */}
     <section>
      <Container>
        <Row>
          <Col lg='3'>
            <h5 className = "services__subtitle">What we serve</h5>
            <h2 className = "service__title">We offer our best services</h2>
          </Col>
          <ServiceList/>
        </Row>
      </Container>
     </section>

     {/* ========== featured tour section start ============*/}
     <section>
     <Container>
       <Row>
         <Col lg='12' className="mb-5">
         <Subtitle subtitle={" Explore "} />
           <h2 className="featured__tour-title">Our featured tours</h2>
         </Col>
         <FeaturedTourList />
       </Row>
      </Container>
     </section>
     {/* ========== featured tour section end ============*/}
     {/* ========== experience section Start============*/}

     <section>
  <Container>
    <Row>
      <Col lg='6'>
        <div className="experience__content">
          <Subtitle subtitle={'Experience'}/>

          <h2>With our all experience <br/> we will serve you</h2>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            <br/>
            Deleniti aut veritatis cupiditate maiores, minus soluta, dicta exercitationem pariatur dignissimos quisquam commodi. Expedita vitae consequuntur, nemo deleniti ea provident fugit ullam.
          </p>
          
          <div className="counter__wrapper d-flex align-items-center gap-5">
            <div className="counter__box">
              <span>12k+</span>
              <h6>Successful Trip</h6>
            </div>
            <div className="counter__box">
              <span>2k+</span>
              <h6>Regular clients</h6>
            </div>
            <div className="counter__box">
              <span>15</span>
              <h6>Years Experience</h6>
            </div>
          </div>
        </div>
      </Col>
      
      <Col lg='6'>
        <div className="experience__img">
          <img src={experienceImg} alt=""/>
        </div>
      </Col>
    </Row>
  </Container>
</section>

     {/* ========== experience section end ============*/}

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
     
  </>
}

export default Home