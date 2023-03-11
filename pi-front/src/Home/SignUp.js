import React, { useState ,useRef,useEffect} from 'react';
import { useNavigate,NavLink } from 'react-router-dom';
import {toast} from 'react-toastify'
import { useSpring, animated } from 'react-spring';
import Terms from './Terms';
import axios from 'axios';
axios.defaults.withCredentials = true;

function SignUp() {
    const initialState={ name:"", lastname:"", email:"",username:"", pwd:""};
    
    const [input, setinput] = useState(initialState);
    const [isChecked, setIsChecked] = useState(false);
    const [showButton, setShowButton] = useState(false);

    const handleCheckboxChangee = (event) => {
      setIsChecked(event.target.checked);
    }
    const history = useNavigate();
    const addclient=async() =>{
        const res= await axios.post("http://localhost:5000/users/add/user",{
    
            name: input.name,
            lastname:input.lastname,
            email:input.email,
            username:input.username,
            pwd: input.pwd,
            image:input.image

        },{withCredentials: true}).catch((err)=>{
            console.error(err)
            
          }

            
         

        )
        history("/")
}  
const TermsAndConditions = () => {
    const [progress, setProgress] = useState(0);
    const containerRef = useRef(null);
}
const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    setShowButton(!showButton);
  };
  
  const buttonAnimation = useSpring({
    from: { opacity: 0 },
    to: { opacity: showButton ? 1 : 0 }
  });
const [accepted, setAccepted] = useState(false);

const handleAccept = () => {
    
    setAccepted(true);
  }
    const Handelsubmit=(e)=>{
           
       e.preventDefault();
       if (accepted) {
        // submit form data
        console.log('Form data submitted successfully!');
        addclient().then(ress => {
            console.log(ress.data)
          
          })
      } else {
        alert('Veuillez accepter les termes et conditions pour continuer');
      }
    
      
     
    
    };
       const  handleInputChange=(e) =>{
          let{name, value}=e.target;
          setinput({...input, [name]:value });
     };
     const handleDecline = () => {
        setAccepted(false);
      }
   
    
    return (

        <div class="sign-in-page">
            <div id="container-inside">
              <div id="circle-small"></div>
              <div id="circle-medium"></div>
              <div id="circle-large"></div>
              <div id="circle-xlarge"></div>
              <div id="circle-xxlarge"></div>
          </div>
            <div class="container p-0">
                <div class="row no-gutters">
                    <div class="col-md-6 text-center pt-5">
                        <div class="sign-in-detail text-white">
                            <a class="sign-in-logo mb-5" href="#"><img src="images/logo-full.png" class="img-fluid" alt="logo"/></a>
                            <div class="owl-carousel" data-autoplay="true" data-loop="true" data-nav="false" data-dots="true" data-items="1" data-items-laptop="1" data-items-tab="1" data-items-mobile="1" data-items-mobile-sm="1" data-margin="0">
                                <div class="item">
                                    <img src="images/login/1.png" class="img-fluid mb-4" alt="logo"/>
                                    <h4 class="mb-1 text-white">Manage your orders</h4>
                                    <p>It is a long established fact that a reader will be distracted by the readable content.</p>
                                </div>
                                <div class="item">
                                    <img src="images/login/1.png" class="img-fluid mb-4" alt="logo"/>
                                    <h4 class="mb-1 text-white">Manage your orders</h4>
                                    <p>It is a long established fact that a reader will be distracted by the readable content.</p>
                                </div>
                                <div class="item">
                                    <img src="images/login/1.png" class="img-fluid mb-4" alt="logo"/>
                                    <h4 class="mb-1 text-white">Manage your orders</h4>
                                    <p>It is a long established fact that a reader will be distracted by the readable content.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-6 bg-white pt-5" >
                    <div class="myBox">

                        <div class="sign-in-from">
                            <h1 class="mb-0">Sign Up</h1>

                            <form methode="POST" onSubmit={Handelsubmit}  class="mt-4">
                                <div class="form-group">
                                    <label for="exampleInputEmail1">First Name {input.name}</label>
                                    <input type="text" class="form-control mb-0" name="name" onChange={handleInputChange} value={input.name} placeholder="Your Full Name"/>
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputEmail1">last Name {input.lastname}</label>
                                    
                                    <input type="text" class="form-control mb-0" name="lastname" onChange={handleInputChange} value={input.lastname} placeholder="Your Last Name"/>
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputEmail2">Email address {input.email}</label>
                                    <input type="email" class="form-control mb-0" name="email" onChange={handleInputChange} value={input.email} placeholder="Your Email"/>
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputEmail2">Username {input.username}</label>
                                    <input type="text" class="form-control mb-0" name="username" onChange={handleInputChange} value={input.username} placeholder="Your  UserName"/>
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputPassword1">Password {input.pwd}</label>
                                    <input type="text" class="form-control mb-0" name="pwd" onChange={handleInputChange} value={input.pwd} placeholder="Your password"/>
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputPassword1">image </label>
                                    <input type="file" class="form-control mb-0" name="image" onChange={handleInputChange} value={input.image} placeholder="Your password"/>
                                </div>
                                <div class="d-inline-block w-100">
                                    <div class="custom-control custom-checkbox d-inline-block mt-2 pt-1">
                                        <input type="checkbox" class="custom-control-input" id="customCheck1"/>
                                        <span>Please read our terms and conditions before using our website.</span>
                                    
     
      <label>
        <input type="checkbox"  onClick={handleAccept} checked={isChecked} onChange={handleCheckboxChange} />
        <a> I agree to the terms and conditions.</a>
      </label>
      {isChecked && <Terms />}
    </div>
                                    <button  type="submit" class="btn btn-primary float-right">Sign Up</button>
                                
                                   
                                  </div>
                                <div class="sign-info">
                                    <span class="dark-color d-inline-block line-height-2">Already Have Account ? <NavLink to="/">sign in</NavLink></span>
                                    <ul class="iq-social-media">
                                        <li><a href="#"><i class="ri-facebook-box-line"></i></a></li>
                                        <li><a href="#"><i class="ri-twitter-line"></i></a></li>
                                        <li><a href="#"><i class="ri-instagram-line"></i></a></li>
                                    </ul>
                                </div>
                            </form>
                         
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    );
}

export default SignUp;