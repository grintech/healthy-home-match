import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const AgentSingle = () => {
  return (
    <div>
      <Navbar />
      <div className="agency_single agent_single">
        <div className="cta-agency cta-agent">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-xl-7">
                <div className="agent-single d-sm-flex align-items-center">
                  <div className="single-img mb-4 ">
                    <img alt="agents" src="/images/agent1.jpg" loading="lazy" />
                  </div>
                  <div className="single-contant ms-4 ">
                    <h1 className="title mb-0 text-white">Mark Kalsen</h1>
                    <p className="fz15 text-white">
                      Company Agent at <b>All American Real Estate</b>
                    </p>
                    <div className="agent-meta mb15 d-md-flex align-items-center">
                      <Link
                        className="text fz15 pe-2 bdrr1 text-white"
                        to="#"
                      >
                        <i className="fas fa-star fz10 review-color2 pe-3"></i>
                        4.6 • 49 Reviews
                      </Link>
                      <Link
                        className="text fz15 pe-2 ps-2 bdrr1 text-white"
                        to="#"
                      >
                        <i className="fa-solid fa-phone"></i>+848 032 03 01
                      </Link>
                      <Link className="text fz15 ps-2 text-white" to="#">
                        <i className="fa-solid fa-envelope"></i> mark@gmail.com
                      </Link>
                    </div>
                    <div class="agent-social mt-3">
                      <Link class="me-3" to="#">
                        <i class="fab fa-facebook-f"></i>
                      </Link>
                      <Link class="me-3" to="#">
                        <i class="fab fa-twitter"></i>
                      </Link>
                      <Link class="me-3" to="#">
                        <i class="fab fa-instagram"></i>
                      </Link>
                      <Link class="me-3" to="#">
                        <i class="fab fa-linkedin-in"></i>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="img-box-12 position-relative d-none d-xl-block">
                  <img
                    className="img-1"
                    src="/images/agency-single.png"
                    alt="svg image"
                  />
                  <img
                    className="img-2"
                    src="/images/agency-single1.png"
                    alt="svg image"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row py-5">
            <div className="col-lg-8 mb-4 mb-lg-0 pe-lg-5">
              <div className="row ">
                <div className="col-lg-12">
                  <div className="agent-single-details  pb30 bdrb1">
                    <h5 className="mb-3 fw-bold">About Agent</h5>

                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Natus molestiae, autem debitis corrupti aut reprehenderit
                      pariatur, tempore inventore adipisci nostrum laudantium
                      quia nemo vero quibusdam, officia facilis iure rem
                      consequatur delectus minus labore ea vitae! Sequi, quaerat
                      facilis nihil illum perspiciatis molestias ea. Suscipit ea
                      modi ipsam voluptas nobis ab itaque sapiente, tenetur
                      eius? Eligendi sint inventore ex blanditiis, quas
                      distinctio perspiciatis corporis, non voluptatibus nulla
                      eos quia nostrum excepturi? Maxime similique dolor id
                      facere sequi sed mollitia quia aut quibusdam sunt.
                      Perspiciatis, cumque voluptatum? Tempora, porro veritatis
                      quia quidem tenetur sint atque. Dolore assumenda eligendi
                      ducimus recusandae doloremque reiciendis.
                    </p>

                    <p className="fw-bold">Read more</p>
                  </div>

                  <div className="row align-items-baseline mt-4">
                    <div className="col-sm-4 mb-3 mb-sm-0">
                      <h5 className="fw-bold mb-0">Listing 12</h5>
                    </div>

                    <div className="col-sm-8">
                      <ul
                        className="nav nav-pills mb-3 justify-content-start justify-content-sm-end"
                        id="pills-tab"
                        role="tablist"
                      >
                        <li className="nav-item" role="presentation">
                          <button
                            className="nav-link active"
                            id="pills-home-tab"
                            data-bs-toggle="pill"
                            data-bs-target="#pills-home"
                            type="button"
                            role="tab"
                            aria-controls="pills-home"
                            aria-selected="true"
                          >
                            All
                          </button>
                        </li>
                        <li className="nav-item" role="presentation">
                          <button
                            className="nav-link"
                            id="pills-profile-tab"
                            data-bs-toggle="pill"
                            data-bs-target="#pills-profile"
                            type="button"
                            role="tab"
                            aria-controls="pills-profile"
                            aria-selected="false"
                          >
                            For Rent
                          </button>
                        </li>
                        <li className="nav-item" role="presentation">
                          <button
                            className="nav-link"
                            id="pills-contact-tab"
                            data-bs-toggle="pill"
                            data-bs-target="#pills-contact"
                            type="button"
                            role="tab"
                            aria-controls="pills-contact"
                            aria-selected="false"
                          >
                            For Sale
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="row py-4">
                    <div className="col-12 ">
                      <div className="tab-content p-0" id="pills-tabContent">
                        <div
                          className="tab-pane  show active"
                          id="pills-home"
                          role="tabpanel"
                          aria-labelledby="pills-home-tab"
                          tabIndex="0"
                        >
                          <div className="row">
                            <div className="col-md-6">
                              <div className="listing-style1 ">
                                <div className=" list-thumb">
                                  <img
                                    alt="listings"
                                    className="w-100"
                                    loading="lazy"
                                    src="/images/card1.jpg"
                                  />
                                  <div className="sale-sticker-wrap">
                                    <div className="list-tag fz12">
                                      <i className="fa-solid fa-bolt me-1"></i>
                                      Passivhaus
                                    </div>
                                    <div className="list-tag fz12 bg-dark">
                                      <i className="fa-solid fa-flag me-1"></i>
                                      Sale
                                    </div>
                                  </div>
                                  <div className="list-price">$14,000</div>
                                </div>
                                <div className=" list-content">
                                  <h6 className="list-title">
                                    <Link
                                      to="/property-single"
                                      data-discover="true"
                                    >
                                      Equestrian Family Home
                                    </Link>
                                  </h6>
                                  <p className="list-text">
                                    San Diego City, CA, USA
                                  </p>
                                  <div className="list-meta d-flex align-items-center">
                                    <Link to="#" data-discover="true">
                                      <i className="fas fa-bed"></i> 5
                                    </Link>
                                    <Link to="#" data-discover="true">
                                      <i className="fas fa-bath"></i> 4
                                    </Link>
                                    <Link to="#" data-discover="true">
                                      <i className="fa-solid fa-chart-area"></i>
                                      900 sq.
                                    </Link>
                                    <Link to="#" data-discover="true">
                                      <i className="fa-solid fa-home"></i> House
                                    </Link>
                                  </div>
                                  <hr />
                                  <div className="list-meta2 d-flex justify-content-between align-items-center mt-3">
                                    <Link
                                      className="view_details"
                                      to="/property-single"
                                      data-discover="true"
                                    >
                                      View details
                                    </Link>
                                    <div className="icons d-flex align-items-center">
                                      <Link to="#" data-discover="true">
                                        <i className="fa-solid fa-arrow-up-right-from-square"></i>
                                      </Link>
                                      <Link to="#" data-discover="true">
                                        <i className="fa-regular fa-heart"></i>
                                      </Link>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="listing-style1 ">
                                <div className=" list-thumb">
                                  <img
                                    alt="listings"
                                    className="w-100"
                                    loading="lazy"
                                    src="/images/card2.jpg"
                                  />
                                  <div className="sale-sticker-wrap">
                                    <div className="list-tag fz12">
                                      <i className="fa-solid fa-bolt me-1"></i>
                                      7+ Star
                                    </div>
                                    <div className="list-tag fz12 bg-dark">
                                      <i className="fa-solid fa-flag me-1"></i>
                                      Rent
                                    </div>
                                  </div>
                                  <div className="list-price">$17,000</div>
                                </div>
                                <div className=" list-content">
                                  <h6 className="list-title">
                                    <Link
                                      to="/property-single"
                                      data-discover="true"
                                    >
                                      Modern Glass Complex
                                    </Link>
                                  </h6>
                                  <p className="list-text">
                                    San Diego City, CA, USA
                                  </p>
                                  <div className="list-meta d-flex align-items-center">
                                    <Link to="#" data-discover="true">
                                      <i className="fas fa-bed"></i> 5
                                    </Link>
                                    <Link to="#" data-discover="true">
                                      <i className="fas fa-bath"></i> 4
                                    </Link>
                                    <Link to="#" data-discover="true">
                                      <i className="fa-solid fa-chart-area"></i>
                                      1200 sq.
                                    </Link>
                                    <Link to="#" data-discover="true">
                                      <i className="fa-solid fa-home"></i>
                                      Apartment
                                    </Link>
                                  </div>
                                  <hr />
                                  <div className="list-meta2 d-flex justify-content-between align-items-center mt-3">
                                    <Link
                                      className="view_details"
                                      to="/property-single"
                                      data-discover="true"
                                    >
                                      View details
                                    </Link>
                                    <div className="icons d-flex align-items-center">
                                      <Link to="#" data-discover="true">
                                        <i className="fa-solid fa-arrow-up-right-from-square"></i>
                                      </Link>
                                      <Link to="#" data-discover="true">
                                        <i className="fa-regular fa-heart"></i>
                                      </Link>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="tab-pane "
                          id="pills-profile"
                          role="tabpanel"
                          aria-labelledby="pills-profile-tab"
                          tabIndex="0"
                        >
                          <div className="row">
                            <div className="col-md-6">
                              <div className="listing-style1 ">
                                <div className=" list-thumb">
                                  <img
                                    alt="listings"
                                    className="w-100"
                                    loading="lazy"
                                    src="/images/card2.jpg"
                                  />
                                  <div className="sale-sticker-wrap">
                                    <div className="list-tag fz12">
                                      <i className="fa-solid fa-bolt me-1"></i>
                                      7+ Star
                                    </div>
                                    <div className="list-tag fz12 bg-dark">
                                      <i className="fa-solid fa-flag me-1"></i>
                                      Rent
                                    </div>
                                  </div>
                                  <div className="list-price">$17,000</div>
                                </div>
                                <div className=" list-content">
                                  <h6 className="list-title">
                                    <Link
                                      to="/property-single"
                                      data-discover="true"
                                    >
                                      Modern Glass Complex
                                    </Link>
                                  </h6>
                                  <p className="list-text">
                                    San Diego City, CA, USA
                                  </p>
                                  <div className="list-meta d-flex align-items-center">
                                    <Link to="#" data-discover="true">
                                      <i className="fas fa-bed"></i> 5
                                    </Link>
                                    <Link to="#" data-discover="true">
                                      <i className="fas fa-bath"></i> 4
                                    </Link>
                                    <Link to="#" data-discover="true">
                                      <i className="fa-solid fa-chart-area"></i>
                                      1200 sq.
                                    </Link>
                                    <Link to="#" data-discover="true">
                                      <i className="fa-solid fa-home"></i>
                                      Apartment
                                    </Link>
                                  </div>
                                  <hr />
                                  <div className="list-meta2 d-flex justify-content-between align-items-center mt-3">
                                    <Link
                                      className="view_details"
                                      to="/property-single"
                                      data-discover="true"
                                    >
                                      View details
                                    </Link>
                                    <div className="icons d-flex align-items-center">
                                      <Link to="#" data-discover="true">
                                        <i className="fa-solid fa-arrow-up-right-from-square"></i>
                                      </Link>
                                      <Link to="#" data-discover="true">
                                        <i className="fa-regular fa-heart"></i>
                                      </Link>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="tab-pane "
                          id="pills-contact"
                          role="tabpanel"
                          aria-labelledby="pills-contact-tab"
                          tabIndex="0"
                        >
                          <div className="row">
                            <div className="col-md-6">
                              <div className="listing-style1 ">
                                <div className=" list-thumb">
                                  <img
                                    alt="listings"
                                    className="w-100"
                                    loading="lazy"
                                    src="/images/card1.jpg"
                                  />
                                  <div className="sale-sticker-wrap">
                                    <div className="list-tag fz12">
                                      <i className="fa-solid fa-bolt me-1"></i>
                                      Passivhaus
                                    </div>
                                    <div className="list-tag fz12 bg-dark">
                                      <i className="fa-solid fa-flag me-1"></i>
                                      Sale
                                    </div>
                                  </div>
                                  <div className="list-price">$14,000</div>
                                </div>
                                <div className=" list-content">
                                  <h6 className="list-title">
                                    <Link
                                      to="/property-single"
                                      data-discover="true"
                                    >
                                      Equestrian Family Home
                                    </Link>
                                  </h6>
                                  <p className="list-text">
                                    San Diego City, CA, USA
                                  </p>
                                  <div className="list-meta d-flex align-items-center">
                                    <Link to="#" data-discover="true">
                                      <i className="fas fa-bed"></i> 5
                                    </Link>
                                    <Link to="#" data-discover="true">
                                      <i className="fas fa-bath"></i> 4
                                    </Link>
                                    <Link to="#" data-discover="true">
                                      <i className="fa-solid fa-chart-area"></i>
                                      900 sq.
                                    </Link>
                                    <Link to="#" data-discover="true">
                                      <i className="fa-solid fa-home"></i> House
                                    </Link>
                                  </div>
                                  <hr />
                                  <div className="list-meta2 d-flex justify-content-between align-items-center mt-3">
                                    <Link
                                      className="view_details"
                                      to="/property-single"
                                      data-discover="true"
                                    >
                                      View details
                                    </Link>
                                    <div className="icons d-flex align-items-center">
                                      <Link to="#" data-discover="true">
                                        <i className="fa-solid fa-arrow-up-right-from-square"></i>
                                      </Link>
                                      <Link to="#" data-discover="true">
                                        <i className="fa-regular fa-heart"></i>
                                      </Link>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <Link
                        className="btn ud-btn btn-white search_home_btn black_btn "
                        to="#"
                        data-discover="true"
                      >
                       Show all properties <i className="fas fa-arrow-right-long"></i>
                      </Link>
                    </div>
                  </div>

                  <hr />

                  <div className="agent_reviews">
                    <div className="row align-items-baseline mt-4">
                      <div className="col-sm-4 mb-3 mb-sm-0">
                        <h5 className="fw-bold mb-0">Reviews (2)</h5>
                      </div>

                      <div className="col-sm-8"></div>
                    </div>

                    <div class="col-md-12">
                      <div class="mbp_first position-relative d-flex align-items-center justify-content-start mt-4 mb-sm-4">
                        <img
                          src="/images/review.png"
                          alt="review.png"
                          loading="lazy"
                        />
                        <div class="ms-4">
                          <h6 class="mt-0 mb-0 fw-bold">Bessie Cooper</h6>
                          <div>
                            <span class="fz14">12 March 2022</span>
                            <div class="blog-single-review">
                              <ul class="mb0 ps-0">
                                <li class="list-inline-item me-0">
                                  <Link to="#">
                                    <i class="fas fa-star review-color2 fz10"></i>
                                  </Link>
                                </li>
                                <li class="list-inline-item me-0">
                                  <Link to="#">
                                    <i class="fas fa-star review-color2 fz10"></i>
                                  </Link>
                                </li>
                                <li class="list-inline-item me-0">
                                  <Link to="#">
                                    <i class="fas fa-star review-color2 fz10"></i>
                                  </Link>
                                </li>
                                <li class="list-inline-item me-0">
                                  <Link to="#">
                                    <i class="fas fa-star review-color2 fz10"></i>
                                  </Link>
                                </li>
                                <li class="list-inline-item me-0">
                                  <Link to="#">
                                    <i class="fas fa-star review-color2 fz10"></i>
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                      <p class="text mt20 mb20">Every single thing we tried with Mark was delicious! Found some awesome places we would definitely go back to on our trip. Mark was also super friendly and passionate about Beşiktaş and Istanbul.</p>
                      <div className="row g-2 review_images">
                        <div className="col-3 col-sm-2">
                            <img src="/images/card1.jpg" className="" alt="image1" />
                        </div>
                        <div className="col-3 col-sm-2">
                            <img src="/images/card2.jpg" className="" alt="image2" />
                        </div>
                        <div className="col-3 col-sm-2">
                            <img src="/images/card3.jpg" className="" alt="image3" />
                        </div>
                        <div className="col-3 col-sm-2">
                            <img src="/images/card4.jpg" className="" alt="image4" />
                        </div>
                      </div>
                      <div className="d-flex mt-3">
                        <div className="d-flex align-items-baseline me-4">
                            <i className="fa-regular fa-thumbs-up me-1"></i><span>Helpul</span>
                        </div>
                        <div className="d-flex align-items-baseline">
                            <i className="fa-regular fa-thumbs-down me-1"></i><span>Not Helpul</span>
                        </div>
                      </div>
                    </div>
                    <hr />
                     <div class="col-md-12">
                      <div class="mbp_first position-relative d-flex align-items-center justify-content-start mt-4 mb-sm-4">
                        <img
                          src="/images/review.png"
                          alt="review.png"
                          loading="lazy"
                        />
                        <div class="ms-4">
                          <h6 class="mt-0 mb-0 fw-bold">John Wick</h6>
                          <div>
                            <span class="fz14">12 March 2022</span>
                            <div class="blog-single-review">
                              <ul class="mb0 ps-0">
                                <li class="list-inline-item me-0">
                                  <Link to="#">
                                    <i class="fas fa-star review-color2 fz10"></i>
                                  </Link>
                                </li>
                                <li class="list-inline-item me-0">
                                  <Link to="#">
                                    <i class="fas fa-star review-color2 fz10"></i>
                                  </Link>
                                </li>
                                <li class="list-inline-item me-0">
                                  <Link to="#">
                                    <i class="fas fa-star review-color2 fz10"></i>
                                  </Link>
                                </li>
                                <li class="list-inline-item me-0">
                                  <Link to="#">
                                    <i class="fas fa-star review-color2 fz10"></i>
                                  </Link>
                                </li>
                                <li class="list-inline-item me-0">
                                  <Link to="#">
                                    <i class="fas fa-star review-color2 fz10"></i>
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                      <p class="text mt20 mb20">Every single thing we tried with Mark was delicious! Found some awesome places we would definitely go back to on our trip. Mark was also super friendly and passionate about Beşiktaş and Istanbul.</p>
                      <div className="row g-2 review_images">
                        <div className="col-3 col-sm-2">
                            <img src="/images/card1.jpg" className="" alt="image1" />
                        </div>
                        <div className="col-3 col-sm-2">
                            <img src="/images/card2.jpg" className="" alt="image1" />
                        </div>
                        <div className="col-3 col-sm-2">
                            <img src="/images/card3.jpg" className="" alt="image1" />
                        </div>
                        <div className="col-3 col-sm-2">
                            <img src="/images/card4.jpg" className="" alt="image1" />
                        </div>
                      </div>

                      <div className="d-flex mt-3">
                        <div className="d-flex align-items-baseline me-4">
                            <i className="fa-regular fa-thumbs-up me-1"></i><span>Helpul</span>
                        </div>
                        <div className="d-flex align-items-baseline">
                            <i className="fa-regular fa-thumbs-down me-1"></i><span>Not Helpul</span>
                        </div>
                      </div>

                    </div>

                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="agency_single_right">
                <div className="agency_single_right_wrapper">
                  <div className="agency_single_form mb-4">
                    <h5 className="form-title mb-4 fw-bold">Contact Form</h5>
                    <form className="form-style1">
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="mb-3">
                            <input
                              className="form-control"
                              placeholder="Your Name"
                              required=""
                              type="text"
                            />
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="mb-3">
                            <input
                              className="form-control"
                              placeholder="Phone"
                              required=""
                              type="text"
                            />
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="mb-3">
                            <input
                              className="form-control"
                              placeholder="Email"
                              required=""
                              type="email"
                            />
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="mb-3">
                            <textarea
                              className="px-2 py-3"
                              cols="30"
                              rows="4"
                              placeholder="Write message here..."
                              required=""
                            ></textarea>
                          </div>
                        </div>
                        <div className="col-md-12 ">
                          <Link
                            className="btn ud-btn btn-white search_home_btn w-100"
                            data-discover="true"
                          >
                            Send Message
                          </Link>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="agency_single_info border-0">
                    <div className="widget-wrapper mb-0">
                      <h6 className="title fw-bold mb-4">
                        Agent Information
                      </h6>
                      <div className="list-news-style d-flex align-items-center justify-content-between mb10">
                        <div className="flex-shrink-0">
                          <h6 className="fw-bold mb-0">Address</h6>
                        </div>
                        <div className="news-content flex-shrink-1 ms-3 text-end">
                          <p className="text mb-0 fz14">
                            House on the Northridge
                          </p>
                        </div>
                      </div>
                      <div className="list-news-style d-flex align-items-center justify-content-between mb10">
                        <div className="flex-shrink-0">
                          <h6 className="fw-bold mb-0">Phone</h6>
                        </div>
                        <div className="news-content flex-shrink-1 ms-3 text-end">
                          <p className="text mb-0 fz14">(484) 524-3699</p>
                        </div>
                      </div>
                      <div className="list-news-style d-flex align-items-center justify-content-between mb10">
                        <div className="flex-shrink-0">
                          <h6 className="fw-bold mb-0">Email</h6>
                        </div>
                        <div className="news-content flex-shrink-1 ms-3 text-end">
                          <p className="text mb-0 fz14">mark@gmail.com</p>
                        </div>
                      </div>

                      <div className="list-news-style d-flex align-items-center justify-content-between mb10">
                        <div className="flex-shrink-0">
                          <h6 className="fw-bold mb-0">Websites</h6>
                        </div>
                        <div className="news-content flex-shrink-1 ms-3 text-end">
                          <p className="text mb-0 fz14">www.my-portfolio.com</p>
                        </div>
                      </div>
                      <div className="list-news-style d-flex align-items-center justify-content-between mb10">
                        <div className="flex-shrink-0">
                          <h6 className="fw-bold mb-0">Member since</h6>
                        </div>
                        <div className="news-content flex-shrink-1 ms-3 text-end">
                          <p className="text mb-0 fz14">10-01-2024</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AgentSingle;
