import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import AllEvents from "../event/views/AllEvents";
import ClientCourse from "../course/views/ClientCourse";
import Library from "../Library/views/Library";
import NewsLetter from "../event/views/NewsLetter";
import Footer from "../components/Footer";
import Lib from "../Library/lib";
function Homebeforsignin(props) {
  const [user, setUser] = useState([]);
  useEffect(()=>{
    getcoachs().then((d)=>{
    setUser(d);
    })
  },[])
  console.log(user)
  const getcoachs = async(id)=>{
      
    const coach=await axios.get(`http://localhost:5000/coach/topcoach`,{
      withCredentials: true,
    })
   
   
   return coach.data

  



}

  
  return (
    <div>
    <Navbar></Navbar>

  
    <section id="hero">
  <div id="heroCarousel" class="carousel slide carousel-fade" data-bs-ride="carousel" data-bs-interval="5000">
    <ol class="carousel-indicators" id="hero-carousel-indicators">
      <li data-bs-target="#heroCarousel" class="active"></li>
      <li data-bs-target="#heroCarousel"></li>
      <li data-bs-target="#heroCarousel"></li>
    </ol>

    <div class="carousel-inner" role="listbox">
      <div class="carousel-item active" style={{backgroundImage: "url(home/assets/img/slide/R.jpg)"}}>
        <div class="carousel-container">
          <div class="container">
            <h2 class="animated fadeInDown">Welcome to <span>Youth Connect </span></h2>
            <p class="animated fadeInUp">Ut velit est quam dolor ad a aliquid qui aliquid. Sequi ea ut et est quaerat sequi nihil ut aliquam. Occaecati alias dolorem mollitia ut. Similique ea voluptatem. Esse doloremque accusamus repellendus deleniti vel. Minus et tempore modi architecto.</p>
            <a href="#about" class="btn-get-started animated fadeInUp scrollto">Read More</a>
          </div>
        </div>
      </div>

 

   
    </div>

    <a class="carousel-control-prev" href="#heroCarousel" role="button" data-bs-slide="prev">
      <span class="carousel-control-prev-icon bi bi-chevron-left" aria-hidden="true"></span>
    </a>
    <a class="carousel-control-next" href="#heroCarousel" role="button" data-bs-slide="next">
      <span class="carousel-control-next-icon bi bi-chevron-right" aria-hidden="true"></span>

    </a>
  
   


    </div>
  </section>
  <main id="main">

   
 
  
    <section id="services" class="services">
      <div class="container-fluid">

        <div class="section-title">
          <h2>Events</h2>
          <h3>Check our <span>Events</span></h3>
          <p>Ut possimus qui ut temporibus culpa velit eveniet modi omnis est adipisci expedita at voluptas atque vitae autem.</p>
        </div>
       <AllEvents></AllEvents>
       <br></br>
       <br></br>

      </div>
    </section>
    <section id="cta" class="cta">
      <div class="container">

        <div class="text-center">
<NewsLetter></NewsLetter>
        </div>

      </div>
    </section>
    <section id="portfolio" class="portfolio">
      <div class="container-fluid">

        <div class="section-title">
    
          <h3>Check our <span>Courses</span></h3>
          <p>Ut possimus qui ut temporibus culpa velit eveniet modi omnis est adipisci expedita at voluptas atque vitae autem.</p>
        </div>

        
       
          <ClientCourse></ClientCourse>
     
      </div>
    </section>


    <section id="testimonials" class="testimonials section-bg">
      <div class="container-fluid">

        <div class="section-title">
        <h2>Library</h2>
          <h3>Check our <span>Library</span></h3>
          <p>Ut possimus qui ut temporibus culpa velit eveniet modi omnis est adipisci expedita at voluptas atque vitae autem.</p>
        </div>

       <Lib></Lib>

       <br></br>

      </div>
    </section>
    <section id="team" class="team">
      <div class="container-fluid">

        <div class="section-title">
          <h2>Mental health </h2>
          <h3>top 4 <span>coach</span></h3>
          <p>Ut possimus qui ut temporibus culpa velit eveniet modi omnis est adipisci expedita at voluptas atque vitae autem.</p>
        </div>

        <div class="row justify-content-center">
          <div class="col-xl-10">
            <div class="row">
            {user &&
                      user.map((item, index) => {
                        return (
                          
              <div class="col-xl-3 col-lg-4 col-md-6">
                <div class="member">
                <img src={item.image} width={300} class="img-fluid"alt="image2" />

                  <div class="member-info">
                    <div class="member-info-content">
                      <h4>{item.name}</h4>
                      <span>{item.specialite}</span>
                    </div>
                    <div class="social">
                      <a href=""><i class="bi bi-twitter"></i></a>
                      <a href=""><i class="bi bi-facebook"></i></a>
                      <a href=""><i class="bi bi-instagram"></i></a>
                      <a href=""><i class="bi bi-linkedin"></i></a>
                    </div>
                  </div>
                </div>
              </div>

                        )})}
       

           

            </div>
          </div>
        </div>

      </div>
    </section>

    <section id="contact" class="contact section-bg">
      <div class="container-fluid">

        <div class="section-title">
          <h2>Contact</h2>
          <h3>Get In Touch With <span>Us</span></h3>
          <p>Ut possimus qui ut temporibus culpa velit eveniet modi omnis est adipisci expedita at voluptas atque vitae autem.</p>
        </div>

        <div class="row justify-content-center">
          <div class="col-xl-10">
            <div class="row">

              <div class="col-lg-6">

                <div class="row justify-content-center">

                  <div class="col-md-6 info d-flex flex-column align-items-stretch">
                    <i class="bx bx-map"></i>
                    <h4>Address</h4>
                    <p>A108 Adam Street,<br/>New York, NY 535022</p>
                  </div>
                  <div class="col-md-6 info d-flex flex-column align-items-stretch">
                    <i class="bx bx-phone"></i>
                    <h4>Call Us</h4>
                    <p>+1 5589 55488 55<br/>+1 5589 22548 64</p>
                  </div>
                  <div class="col-md-6 info d-flex flex-column align-items-stretch">
                    <i class="bx bx-envelope"></i>
                    <h4>Email Us</h4>
                    <p>contact@example.com<br/>info@example.com</p>
                  </div>
                  <div class="col-md-6 info d-flex flex-column align-items-stretch">
                    <i class="bx bx-time-five"></i>
                    <h4>Working Hours</h4>
                    <p>Mon - Fri: 9AM to 5PM<br/>Sunday: 9AM to 1PM</p>
                  </div>

                </div>

              </div>

              <div class="col-lg-6">
                <form action="forms/contact.php" method="post" role="form" class="php-email-form">
                  <div class="row">
                    <div class="col-md-6 form-group">
                      <label for="name">Your Name</label>
                      <input type="text" name="name" class="form-control" id="name" required/>
                    </div>
                    <div class="col-md-6 form-group mt-3 mt-md-0">
                      <label for="email">Your Email</label>
                      <input type="email" class="form-control" name="email" id="email" required/>
                    </div>
                  </div>
                  <div class="form-group mt-3">
                    <label for="subject">Subject</label>
                    <input type="text" class="form-control" name="subject" id="subject" required/>
                  </div>
                  <div class="form-group mt-3">
                    <label for="message">Message</label>
                    <textarea class="form-control" name="message" rows="8" required></textarea>
                  </div>
                  <div class="my-3">
                    <div class="loading">Loading</div>
                    <div class="error-message"></div>
                    <div class="sent-message">Your message has been sent. Thank you!</div>
                  </div>
                  <div class="text-center"><button type="submit">Send Message</button></div>
                </form>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  </main>


<Footer></Footer>

    </div>
  );
}

export default Homebeforsignin;
