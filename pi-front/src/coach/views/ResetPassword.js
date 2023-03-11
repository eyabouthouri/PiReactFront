import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Store } from "react-notifications-component";

const ResetPassword = ({ history, match }) => {
  const params = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const resetPasswordHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        setError("");
      }, 5000);
      return setError("Passwords do not match");
    }
    try {
      const { data } = await axios.post(`/users/resetpassword/${params.token}`, {
        pwd: password,
      });
      setSuccess(data.data);
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <section class="sign-in-page">
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
              <a class="sign-in-logo mb-5" href="#">
                <img src="/images/logo-full.png" class="img-fluid" alt="logo" />
              </a>
            </div>
          </div>
          <div class="col-md-6 bg-white pt-5">
            <div class="sign-in-from">
              <img src="/images/login/mail.png" width="80" alt="" />
              <form onSubmit={resetPasswordHandler} class="lg:p-10 p-6 space-y-3 relative bg-white shadow-xl rounded-md">
                <h1 class="lg:text-2xl text-xl font-semibold mb-6"> Reset Password </h1>
                {success && (
                  <span>
                    {success} <Link to="/">Login</Link>
                  </span>
                )}

                <div>
                  <label htmlFor="password" class="mb-0">
                    {" "}
                    New Password{" "}
                  </label>
                  <input type="password" placeholder="******" id="password" required value={password} onChange={(e) => setPassword(e.target.value)} class="bg-gray-100 h-12 mt-2 px-3 rounded-md w-full" />
                </div>
                <div>
                  <label htmlFor="confpassword" class="mb-0">
                    {" "}
                    Confirm Password{" "}
                  </label>
                  <input type="password" placeholder="******" id="confpassword" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} class="bg-gray-100 h-12 mt-2 px-3 rounded-md w-full" />
                </div>
                {error && <span style={{ color: "red" }}>{error}</span>}
                <div>
                  <button type="submit">Reset Password</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
