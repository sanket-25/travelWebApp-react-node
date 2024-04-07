import React, {useEffect, useRef, useState , useContext } from 'react';
import { Container, Row, Col , Form} from 'reactstrap';
import { useParams } from 'react-router-dom'; // Import useParams from react-router-dom
import calculateAvgRating from '../utils/avgRating';
import '../style/tour-details.css'
import { ListGroup } from 'reactstrap';
import avatar from '../assets/images/avatar.jpg';
import Booking from '../components/Booking/Booking';
import Newsletter from "../shared/Newsletter";
import { BASE_URL } from '../utils/config';
import useFetch from '../hooks/useFetch';
import {AuthContext} from './../context/AuthContext'

const TourDetails = () => {
    const { id } = useParams(); 
    const reviewMsgRef = useRef(null);
    const [tourRating, setTourRating]=useState(null);
    const {user} = useContext(AuthContext)

  // fetch data from database
  const { data: tour , loading, error } = useFetch(`${BASE_URL}/tours/${id}`);

  // Destructuring properties from the tour object
  const { photo, title, desc, price, address, reviews, city, distance, maxGroupSize } = tour || {};
  const { totalRating, avgRating } = calculateAvgRating(reviews || []);



  //formate data
  const options = {day:'numeric' , month:'long' , year:'numeric'}

  //submit request to the server
  const submitHandler = async (e) => {
    e.preventDefault();
  const reviewText = reviewMsgRef.current.value;

  

  try {
    
    if(!user || user===undefined || user===null){
      alert('Please sign in')
    }

    const reviewObj = {
      username:user?.username,
      reviewText,
      rating:tourRating
    }

    const res = await fetch(`${BASE_URL}/review/${id}`,{
      method:'post',
      headers: {
        'Content-Type': 'application/json',
      },
      
      credentials:'include',
      body:JSON.stringify(reviewObj)
    })

    const result = await res.json()
    if(!res.ok){
      return alert(result.message);
    }
    
    alert(result.message)
  } catch (err) {
    alert(err.message);
  }

  
  // Later, you might call your API to submit the review using tourRating and reviewText
};


useEffect(() => {
  window.scrollTo(0,0)
},[tour])

  return (
    <>
      <section>
        <Container>
        {loading && <h4 className='text-center pt-5'>Loading...</h4>}
        {error && <h4 className='text-center pt-5'>{error}</h4>}
         { !loading && !error && <Row>
            <Col lg="8">
              <div className="tour_content"> {/* Fix the classname to className */}
                <img src={photo} alt={title} />

                <div className="tour_info">
                  <h2>{title}</h2>

                  <div className="tour_details">
                   <span className="tour_rating d-flex align-items-center gap-1">
                      <i className="ri-star-s-fill" style={{ color: "var(--secondary-color)" }}></i> {avgRating === 0 ? null : avgRating}
                   {totalRating === 0 ? "Not rated" : null} <span>({reviews?.length})</span>
                    </span>
                  <span>
                     <i className="ri-map-pin-user-fill"></i> {address}
                  </span>
                 </div>
                 <div className="tour_extra-details">
                  <span><i class="ri-map-pin-2-line"></i> {city}</span>
                  <span><i class="ri-money-dollar-circle-line"></i> ${price} / per person</span>
                  <span><i class="ri-group-line"></i> {maxGroupSize} people</span>
                  <span><i class="ri-map-pin-time-line"></i> ${distance} k/m</span>
                  
                 </div>
                 <h5>Description</h5>
                 <p>{desc}</p>
              </div>
              {/*=========== tour reviews section============*/}
              <div className="tour_reviews mt-4">
                <h4>Reviews ({reviews?.length} reviews)</h4>

                <Form onSubmit={submitHandler}>
                  <div className="d-flex align-items-center gap-3 mb-4
                  rating_group">
                    <span onClick={()=> setTourRating(1)}> 1 <i className="ri-star-s-fill"></i></span>
                    <span onClick={()=> setTourRating(2)}> 2 <i className="ri-star-s-fill"></i></span>
                    <span onClick={()=> setTourRating(3)}> 3 <i className="ri-star-s-fill"></i></span>
                    <span onClick={()=> setTourRating(4)}> 4 <i className="ri-star-s-fill"></i></span>
                    <span onClick={()=> setTourRating(5)}> 5 <i className="ri-star-s-fill"></i></span>
                  </div>
                  <div className="review_input">
                      <input type="text" ref={reviewMsgRef} placeholder="Share your thoughts..." 
                       required/>
                      <button className="btn primary_btn text-white" type="submit">
                        Submit
                      </button>
                  </div>
                </Form>
                
                <ListGroup className="user_reviews">
                    {
                      reviews?.map(review=>(
                        <div className="reviews_item">
                          <img src={avatar} alt="" />
                          <div className="w-100">
                            <div className="d-flex align-items-center
                            justify-content-between">
                              <div>
                                <h5>{review.username}</h5>
                                <p>{new Date(review.createdAt).toLocaleDateString('en-US',options)}</p>
                              </div>
                              <span className='d-flex align-items-center'>
                                {review.rating} <i class="ri-star-s-fill"></i>  
                              </span>
                            </div>
                            <h6>{review.reviewText}</h6>
                          </div>
                        </div>
                      ))
                    }
                </ListGroup>

              </div>
              {/*=========== tour reviews section end============*/}
            </div>

          </Col>

          <Col lg='4'>
            <Booking tour={tour} avgRating={avgRating} />
          </Col>
        </Row>}
      </Container>
    </section>
    <Newsletter/>
    </>
  )
}

export default TourDetails;