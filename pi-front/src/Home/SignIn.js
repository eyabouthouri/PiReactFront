import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate,Link,NavLink } from 'react-router-dom';
import image from "../login/image1.png"

axios.defaults.withCredentials = true;
function SignIn(props) {
    const [msg,setmsg]=useState("")
    const [valid, setValid] = useState(true);
    const [inputt, setinput] = useState(
        {
            username:"",
            password:""
            
        }
    
       );
       var role="admin";
       var history=useNavigate()
       function handleInputChange(event) {
        setinput({...inputt,username:event.target.value})
      }
      function handleInputChange2(e){
        setinput({...inputt,password:e.target.value})
      }
      const sendrequest = async() =>{
        const res= await axios.post("http://localhost:5000/users/login",{
    
            username: inputt.username,
            pwd: inputt.password
        },{withCredentials: true}).catch((err)=>{
            setValid(false);
            console.error(err.response.data.message)
            setmsg(err.response.data.message);
          
            
          }
            
         
        )
       

        const data= await res.data        
                console.log(data)
        return data;
    }

    
        const Handelsubmit=(e)=>{
            
           e.preventDefault();
        
           sendrequest().then(ress => {
           // console.log(ress.userexisting); 
           if(ress.userexisting.role=="user")
           {
            history("/home")
           }
           else if(ress.userexisting.role=="admin")
           {
            history("/ShowCoach")
           }
          }
          )  
       
        }
       
    return (
        <div  class="sign-in-page">
        <div id="container-inside">
        <div id="circle-small"></div>
        <div id="circle-medium"></div>
        <div id="circle-large"></div>
        <div id="circle-xlarge"></div>
        <div id="circle-xxlarge"></div>
  
        <div className="container p-0">
                <div className="row no-gutters">
                    <div className="col-md-6 text-center pt-5">
                        <div className="sign-in-detail text-white">
                            <a className="sign-in-logo mb-5" href="#"><img src="images/logo-full.png" className="img-fluid" alt="logo"/></a>
                            <div className="owl-carousel" data-autoplay="true" data-loop="true" data-nav="false" data-dots="true" data-items="1" data-items-laptop="1" data-items-tab="1" data-items-mobile="1" data-items-mobile-sm="1" data-margin="0">
                             
                                <div className="item">
                                    <img src={process.env.PUBLIC_URL+"/images/login/2.png"} className="img-fluid mb-4" alt="logo"/> 
                                    <h4 className="mb-1 text-white">Connect with the world</h4>
                                    <p>It is a long established fact that a reader will be distracted by the readable content.</p>
                                </div>
                                <div className="item">
                                    <img src={process.env.PUBLIC_URL+"/images/login/3.png"}className="img-fluid mb-4" alt="logo"/>
                                    <h4 class="mb-1 text-white">Create new events</h4>
                                    <p>It is a long established fact that a reader will be distracted by the readable content.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 bg-white pt-5">
                        <div className="sign-in-from">
                            <h1 className="mb-0">Sign in</h1>
                            <p>Enter your email address and password to access admin panel.</p>
                            <form className="mt-4" onSubmit={Handelsubmit}>
                            {!valid && <span style={{ color: 'red' }}>{msg}!! </span>}
                                <div className="form-group">
                                    <label for="exampleInputEmail1">Username</label>
                                    <input type="text" className="form-control form-control-lg" value={inputt.username} onChange={handleInputChange} />
                                     
                                </div>
                                <div className="form-group">
                                    <label for="exampleInputPassword1">Password</label>
                                    <a href="#" class="float-right">Forgot password?</a>
                                    <input type="password" value={inputt.password} onChange={handleInputChange2} name="password"  id="form3Example4" class="form-control form-control-lg"></input>
                                </div>
                                <div className="d-inline-block w-100">
                                    <div className="custom-control custom-checkbox d-inline-block mt-2 pt-1">
                                        <input type="checkbox" class="custom-control-input" id="customCheck1"/>
                                        <label className="custom-control-label" for="customCheck1">Remember Me</label>
                                    </div>
                                    <button type="submit" class="btn btn-primary float-right">Sign in</button>
                                </div>
                                <div className="sign-info">
                                    <span class="dark-color d-inline-block line-height-2">Don't have an account? <NavLink to="/SignUp">Sign up</NavLink></span>
                                    <ul className="iq-social-media">
                                        <li><a href="#"><i className="ri-facebook-box-line"></i></a></li>
                                        <li><a href="#"><i className="ri-twitter-line"></i></a></li>
                                        <li><a href="#"><i className="ri-instagram-line"></i></a></li>
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

export default SignIn;