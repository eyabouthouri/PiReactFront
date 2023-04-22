import React from "react";

function Footer() {
  return (
    <div>
      <footer class="bg-white iq-footer">
        <div class="container-fluid">
          <div class="row">
            <div class="col-lg-6">
              <ul class="list-inline mb-0">
                <li class="list-inline-item">
                  <a href="privacy-policy.html">Privacy Policy</a>
                </li>
                <li class="list-inline-item">
                  <a href="terms-of-service.html">Terms of Use</a>
                </li>
              </ul>
            </div>
            <div class="col-lg-6 text-right">
              Copyright 2023 <a href="#">Youth Connect</a> All Rights Reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
