import React from "react";
import Topnav from "../../components/Topnav";
import AddEvent from "./AddEvent";
import { Routes, Route } from "react-router-dom";
function Event(props) {
  return (
    <div>
      <Topnav />
      <div class="header-for-bg">
        <div class="background-header position-relative">
          <img src="images/page-img/profile-bg5.jpg" class="img-fluid rounded w-100 rounded rounded" alt="profile-bg" />
          <div class="title-on-header">
            <div class="data-block">
              <h2>Your Photos</h2>
            </div>
          </div>
        </div>
        <div id="content-page" className="content-page">
          <div className="container">
            <div className="row">
              <div className="col-md-6 col-lg-4 mb-3">
                <div className="user-images position-relative overflow-hidden">
                  <a href="#">
                    <img src="images/page-img/51.jpg" className="img-fluid rounded" alt="Responsive image" />
                  </a>
                  <div className="image-hover-data">
                    <div className="product-elements-icon">
                      <ul className="d-flex align-items-center m-0 p-0 list-inline">
                        <li>
                          <a href="#" className="pr-3 text-white">
                            {" "}
                            60 <i className="ri-thumb-up-line"></i>{" "}
                          </a>
                        </li>
                        <li>
                          <a href="#" className="pr-3 text-white">
                            {" "}
                            30 <i className="ri-chat-3-line"></i>{" "}
                          </a>
                        </li>
                        <li>
                          <a href="#" className="pr-3 text-white">
                            {" "}
                            10 <i className="ri-share-forward-line"></i>{" "}
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <a href="#" className="image-edit-btn" data-toggle="tooltip" data-placement="top" title="" data-original-title="Edit or Remove">
                    <i className="ri-edit-2-fill"></i>
                  </a>
                </div>
              </div>
              <div className="col-md-6 col-lg-4 mb-3">
                <div className="user-images position-relative overflow-hidden">
                  <a href="#">
                    <img src="images/page-img/52.jpg" className="img-fluid rounded" alt="Responsive image" />
                  </a>
                  <div className="image-hover-data">
                    <div className="product-elements-icon">
                      <ul className="d-flex align-items-center m-0 p-0 list-inline">
                        <li>
                          <a href="#" className="pr-3 text-white">
                            {" "}
                            60 <i className="ri-thumb-up-line"></i>{" "}
                          </a>
                        </li>
                        <li>
                          <a href="#" className="pr-3 text-white">
                            {" "}
                            30 <i className="ri-chat-3-line"></i>{" "}
                          </a>
                        </li>
                        <li>
                          <a href="#" className="pr-3 text-white">
                            {" "}
                            10 <i className="ri-share-forward-line"></i>{" "}
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <a href="#" className="image-edit-btn" data-toggle="tooltip" data-placement="top" title="" data-original-title="Edit or Remove">
                    <i className="ri-edit-2-fill"></i>
                  </a>
                </div>
              </div>
              <div className="col-md-6 col-lg-4 mb-3">
                <div className="user-images position-relative overflow-hidden">
                  <a href="#">
                    <img src="images/page-img/53.jpg" className="img-fluid rounded" alt="Responsive image" />
                  </a>
                  <div className="image-hover-data">
                    <div className="product-elements-icon">
                      <ul className="d-flex align-items-center m-0 p-0 list-inline">
                        <li>
                          <a href="#" className="pr-3 text-white">
                            {" "}
                            60 <i className="ri-thumb-up-line"></i>{" "}
                          </a>
                        </li>
                        <li>
                          <a href="#" className="pr-3 text-white">
                            {" "}
                            30 <i className="ri-chat-3-line"></i>{" "}
                          </a>
                        </li>
                        <li>
                          <a href="#" className="pr-3 text-white">
                            {" "}
                            10 <i className="ri-share-forward-line"></i>{" "}
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <a href="#" className="image-edit-btn" data-toggle="tooltip" data-placement="top" title="" data-original-title="Edit or Remove">
                    <i className="ri-edit-2-fill"></i>
                  </a>
                </div>
              </div>
              <div className="col-md-6 col-lg-4 mb-3">
                <div className="user-images position-relative overflow-hidden">
                  <a href="#">
                    <img src="images/page-img/54.jpg" className="img-fluid rounded" alt="Responsive image" />
                  </a>
                  <div className="image-hover-data">
                    <div className="product-elements-icon">
                      <ul className="d-flex align-items-center m-0 p-0 list-inline">
                        <li>
                          <a href="#" className="pr-3 text-white">
                            {" "}
                            60 <i className="ri-thumb-up-line"></i>{" "}
                          </a>
                        </li>
                        <li>
                          <a href="#" className="pr-3 text-white">
                            {" "}
                            30 <i className="ri-chat-3-line"></i>{" "}
                          </a>
                        </li>
                        <li>
                          <a href="#" className="pr-3 text-white">
                            {" "}
                            10 <i className="ri-share-forward-line"></i>{" "}
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <a href="#" className="image-edit-btn" data-toggle="tooltip" data-placement="top" title="" data-original-title="Edit or Remove">
                    <i className="ri-edit-2-fill"></i>
                  </a>
                </div>
              </div>
              <div className="col-md-6 col-lg-4 mb-3">
                <div className="user-images position-relative overflow-hidden">
                  <a href="#">
                    <img src="images/page-img/55.jpg" className="img-fluid rounded" alt="Responsive image" />
                  </a>
                  <div className="image-hover-data">
                    <div className="product-elements-icon">
                      <ul className="d-flex align-items-center m-0 p-0 list-inline">
                        <li>
                          <a href="#" className="pr-3 text-white">
                            {" "}
                            60 <i className="ri-thumb-up-line"></i>{" "}
                          </a>
                        </li>
                        <li>
                          <a href="#" className="pr-3 text-white">
                            {" "}
                            30 <i className="ri-chat-3-line"></i>{" "}
                          </a>
                        </li>
                        <li>
                          <a href="#" className="pr-3 text-white">
                            {" "}
                            10 <i className="ri-share-forward-line"></i>{" "}
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <a href="#" className="image-edit-btn" data-toggle="tooltip" data-placement="top" title="" data-original-title="Edit or Remove">
                    <i className="ri-edit-2-fill"></i>
                  </a>
                </div>
              </div>
              <div className="col-md-6 col-lg-4 mb-3">
                <div className="user-images position-relative overflow-hidden">
                  <a href="#">
                    <img src="images/page-img/56.jpg" className="img-fluid rounded" alt="Responsive image" />
                  </a>
                  <div className="image-hover-data">
                    <div className="product-elements-icon">
                      <ul className="d-flex align-items-center m-0 p-0 list-inline">
                        <li>
                          <a href="#" className="pr-3 text-white">
                            {" "}
                            60 <i className="ri-thumb-up-line"></i>{" "}
                          </a>
                        </li>
                        <li>
                          <a href="#" className="pr-3 text-white">
                            {" "}
                            30 <i className="ri-chat-3-line"></i>{" "}
                          </a>
                        </li>
                        <li>
                          <a href="#" className="pr-3 text-white">
                            {" "}
                            10 <i className="ri-share-forward-line"></i>{" "}
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <a href="#" className="image-edit-btn" data-toggle="tooltip" data-placement="top" title="" data-original-title="Edit or Remove">
                    <i className="ri-edit-2-fill"></i>
                  </a>
                </div>
              </div>
              <div className="col-md-6 col-lg-4 mb-3">
                <div className="user-images position-relative overflow-hidden">
                  <a href="#">
                    <img src="images/page-img/57.jpg" className="img-fluid rounded" alt="Responsive image" />
                  </a>
                  <div className="image-hover-data">
                    <div className="product-elements-icon">
                      <ul className="d-flex align-items-center m-0 p-0 list-inline">
                        <li>
                          <a href="#" className="pr-3 text-white">
                            {" "}
                            60 <i className="ri-thumb-up-line"></i>{" "}
                          </a>
                        </li>
                        <li>
                          <a href="#" className="pr-3 text-white">
                            {" "}
                            30 <i className="ri-chat-3-line"></i>{" "}
                          </a>
                        </li>
                        <li>
                          <a href="#" className="pr-3 text-white">
                            {" "}
                            10 <i className="ri-share-forward-line"></i>{" "}
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <a href="#" className="image-edit-btn" data-toggle="tooltip" data-placement="top" title="" data-original-title="Edit or Remove">
                    <i className="ri-edit-2-fill"></i>
                  </a>
                </div>
              </div>
              <div className="col-md-6 col-lg-4 mb-3">
                <div className="user-images position-relative overflow-hidden">
                  <a href="#">
                    <img src="images/page-img/58.jpg" className="img-fluid rounded" alt="Responsive image" />
                  </a>
                  <div className="image-hover-data">
                    <div className="product-elements-icon">
                      <ul className="d-flex align-items-center m-0 p-0 list-inline">
                        <li>
                          <a href="#" className="pr-3 text-white">
                            {" "}
                            60 <i className="ri-thumb-up-line"></i>{" "}
                          </a>
                        </li>
                        <li>
                          <a href="#" className="pr-3 text-white">
                            {" "}
                            30 <i className="ri-chat-3-line"></i>{" "}
                          </a>
                        </li>
                        <li>
                          <a href="#" className="pr-3 text-white">
                            {" "}
                            10 <i className="ri-share-forward-line"></i>{" "}
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <a href="#" className="image-edit-btn" data-toggle="tooltip" data-placement="top" title="" data-original-title="Edit or Remove">
                    <i className="ri-edit-2-fill"></i>
                  </a>
                </div>
              </div>
              <div className="col-md-6 col-lg-4 mb-3">
                <div className="user-images position-relative overflow-hidden">
                  <a href="#">
                    <img src="images/page-img/59.jpg" className="img-fluid rounded" alt="Responsive image" />
                  </a>
                  <div className="image-hover-data">
                    <div className="product-elements-icon">
                      <ul className="d-flex align-items-center m-0 p-0 list-inline">
                        <li>
                          <a href="#" className="pr-3 text-white">
                            {" "}
                            60 <i className="ri-thumb-up-line"></i>{" "}
                          </a>
                        </li>
                        <li>
                          <a href="#" className="pr-3 text-white">
                            {" "}
                            30 <i className="ri-chat-3-line"></i>{" "}
                          </a>
                        </li>
                        <li>
                          <a href="#" className="pr-3 text-white">
                            {" "}
                            10 <i className="ri-share-forward-line"></i>{" "}
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <a href="#" className="image-edit-btn" data-toggle="tooltip" data-placement="top" title="" data-original-title="Edit or Remove">
                    <i className="ri-edit-2-fill"></i>
                  </a>
                </div>
              </div>
              <div className="col-md-6 col-lg-4 mb-3">
                <div className="user-images position-relative overflow-hidden">
                  <a href="#">
                    <img src="images/page-img/60.jpg" className="img-fluid rounded" alt="Responsive image" />
                  </a>
                  <div className="image-hover-data">
                    <div className="product-elements-icon">
                      <ul className="d-flex align-items-center m-0 p-0 list-inline">
                        <li>
                          <a href="#" className="pr-3 text-white">
                            {" "}
                            60 <i className="ri-thumb-up-line"></i>{" "}
                          </a>
                        </li>
                        <li>
                          <a href="#" className="pr-3 text-white">
                            {" "}
                            30 <i className="ri-chat-3-line"></i>{" "}
                          </a>
                        </li>
                        <li>
                          <a href="#" className="pr-3 text-white">
                            {" "}
                            10 <i className="ri-share-forward-line"></i>{" "}
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <a href="#" className="image-edit-btn" data-toggle="tooltip" data-placement="top" title="" data-original-title="Edit or Remove">
                    <i className="ri-edit-2-fill"></i>
                  </a>
                </div>
              </div>
              <div className="col-md-6 col-lg-4 mb-3">
                <div className="user-images position-relative overflow-hidden">
                  <a href="#">
                    <img src="images/page-img/61.jpg" className="img-fluid rounded" alt="Responsive image" />
                  </a>
                  <div className="image-hover-data">
                    <div className="product-elements-icon">
                      <ul className="d-flex align-items-center m-0 p-0 list-inline">
                        <li>
                          <a href="#" className="pr-3 text-white">
                            {" "}
                            60 <i className="ri-thumb-up-line"></i>{" "}
                          </a>
                        </li>
                        <li>
                          <a href="#" className="pr-3 text-white">
                            {" "}
                            30 <i className="ri-chat-3-line"></i>{" "}
                          </a>
                        </li>
                        <li>
                          <a href="#" className="pr-3 text-white">
                            {" "}
                            10 <i className="ri-share-forward-line"></i>{" "}
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <a href="#" className="image-edit-btn" data-toggle="tooltip" data-placement="top" title="" data-original-title="Edit or Remove">
                    <i className="ri-edit-2-fill"></i>
                  </a>
                </div>
              </div>
              <div className="col-md-6 col-lg-4 mb-3">
                <div className="user-images position-relative overflow-hidden">
                  <a href="#">
                    <img src="images/page-img/62.jpg" className="img-fluid rounded" alt="Responsive image" />
                  </a>
                  <div className="image-hover-data">
                    <div className="product-elements-icon">
                      <ul className="d-flex align-items-center m-0 p-0 list-inline">
                        <li>
                          <a href="#" className="pr-3 text-white">
                            {" "}
                            60 <i className="ri-thumb-up-line"></i>{" "}
                          </a>
                        </li>
                        <li>
                          <a href="#" className="pr-3 text-white">
                            {" "}
                            30 <i className="ri-chat-3-line"></i>{" "}
                          </a>
                        </li>
                        <li>
                          <a href="#" className="pr-3 text-white">
                            {" "}
                            10 <i className="ri-share-forward-line"></i>{" "}
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <a href="#" className="image-edit-btn" data-toggle="tooltip" data-placement="top" title="" data-original-title="Edit or Remove">
                    <i className="ri-edit-2-fill"></i>
                  </a>
                </div>
              </div>
              <div className="col-md-6 col-lg-4 mb-3">
                <div className="user-images position-relative overflow-hidden">
                  <a href="#">
                    <img src="images/page-img/63.jpg" className="img-fluid rounded" alt="Responsive image" />
                  </a>
                  <div className="image-hover-data">
                    <div className="product-elements-icon">
                      <ul className="d-flex align-items-center m-0 p-0 list-inline">
                        <li>
                          <a href="#" className="pr-3 text-white">
                            {" "}
                            60 <i className="ri-thumb-up-line"></i>{" "}
                          </a>
                        </li>
                        <li>
                          <a href="#" className="pr-3 text-white">
                            {" "}
                            30 <i className="ri-chat-3-line"></i>{" "}
                          </a>
                        </li>
                        <li>
                          <a href="#" className="pr-3 text-white">
                            {" "}
                            10 <i className="ri-share-forward-line"></i>{" "}
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <a href="#" className="image-edit-btn" data-toggle="tooltip" data-placement="top" title="" data-original-title="Edit or Remove">
                    <i className="ri-edit-2-fill"></i>
                  </a>
                </div>
              </div>
              <div className="col-md-6 col-lg-4 mb-3">
                <div className="user-images position-relative overflow-hidden">
                  <a href="#">
                    <img src="images/page-img/64.jpg" className="img-fluid rounded" alt="Responsive image" />
                  </a>
                  <div className="image-hover-data">
                    <div className="product-elements-icon">
                      <ul className="d-flex align-items-center m-0 p-0 list-inline">
                        <li>
                          <a href="#" className="pr-3 text-white">
                            {" "}
                            60 <i className="ri-thumb-up-line"></i>{" "}
                          </a>
                        </li>
                        <li>
                          <a href="#" className="pr-3 text-white">
                            {" "}
                            30 <i className="ri-chat-3-line"></i>{" "}
                          </a>
                        </li>
                        <li>
                          <a href="#" className="pr-3 text-white">
                            {" "}
                            10 <i className="ri-share-forward-line"></i>{" "}
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <a href="#" className="image-edit-btn" data-toggle="tooltip" data-placement="top" title="" data-original-title="Edit or Remove">
                    <i className="ri-edit-2-fill"></i>
                  </a>
                </div>
              </div>
              <div className="col-md-6 col-lg-4 mb-3">
                <div className="user-images position-relative overflow-hidden">
                  <a href="#">
                    <img src="images/page-img/65.jpg" className="img-fluid rounded" alt="Responsive image" />
                  </a>
                  <div className="image-hover-data">
                    <div className="product-elements-icon">
                      <ul className="d-flex align-items-center m-0 p-0 list-inline">
                        <li>
                          <a href="#" className="pr-3 text-white">
                            {" "}
                            60 <i className="ri-thumb-up-line"></i>{" "}
                          </a>
                        </li>
                        <li>
                          <a href="#" className="pr-3 text-white">
                            {" "}
                            30 <i className="ri-chat-3-line"></i>{" "}
                          </a>
                        </li>
                        <li>
                          <a href="#" className="pr-3 text-white">
                            {" "}
                            10 <i className="ri-share-forward-line"></i>{" "}
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <a href="#" className="image-edit-btn" data-toggle="tooltip" data-placement="top" title="" data-original-title="Edit or Remove">
                    <i className="ri-edit-2-fill"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Event;
