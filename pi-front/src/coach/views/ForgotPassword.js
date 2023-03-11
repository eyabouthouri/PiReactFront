import React, { useState } from "react";
import axios from "axios";
import { Store } from 'react-notifications-component'
import { redirect } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const forgotPasswordHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/users/forgotpassword", { email });
      setSuccess(data.data);
      Store.addNotification({
        title: "Email send",
        message: "Please check your e_mail",
        type: "success",
        insert: "bottom",
        container: "bottom-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 3000,
        },
      });
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <section className="sign-in-page">
        
      <div id="container-inside">
        <div id="circle-small"></div>
        <div id="circle-medium"></div>
        <div id="circle-large"></div>
        <div id="circle-xlarge"></div>
        <div id="circle-xxlarge"></div>
      </div>
      <div className="container p-0">
        <div className="row no-gutters">
          <div className="col-md-6 text-center pt-5">
            <div className="sign-in-detail text-white">
              <a className="sign-in-logo mb-5" href="#">
                <img
                  src="images/logo-full.png"
                  className="img-fluid"
                  alt="logo"
                />
              </a>
            </div>
          </div>
          <div className="col-md-6 bg-white pt-5">
            <div className="sign-in-from">
              <img src="images/login/mail.png" width="80" alt="" />
              <form
                onSubmit={forgotPasswordHandler}
                className="lg:p-10 p-6 space-y-3 relative bg-white shadow-xl rounded-md"
              >
                <h1 className="lg:text-2xl text-xl font-semibold mb-6">
                  {" "}
                  Forgot Password{" "}
                </h1>

                {success && <span>{success}</span>}
                <div>
                  <p>
                    Please enter the email address you register your account
                    with. we will send you reset password confirmation to this
                    email
                  </p>
                </div>
                <div>
                  <label htmlFor="email" className="mb-0">
                    {" "}
                    Email Address{" "}
                  </label>
                  <input
                    type="email"
                    placeholder="Info@example.com"
                    id="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-gray-100 h-12 mt-2 px-3 rounded-md w-full"
                  />
                </div>
                {error && <span style={{ color: "red" }}>{error}</span>}
                <div className="d-inline-block w-100">
                  <button type="submit" className="btn btn-primary mt-3">
                    {" "}
                    Send Email
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
