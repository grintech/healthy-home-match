const HeroBanner = () => {
 
  return (
    <>
         <section className="hero_banner">
        <div className="container">
          <div className="col-xl-9 hero_tabs ">
            <h1 className='hero_title' >Easy Way to Find a <br /> Perfect <span> Property</span></h1>
            <p className="hero-text fz15 animate-up-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. deserunt nisi pariatur?

            </p>
            <img className="hero_floating" src="/images/hero_svg.png" alt="svg-image" />

            <div >
                <ul className="nav nav-tabs mt-5" id="myTab" role="tablist" >
                    <li className="nav-item" role="presentation">
                      <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Buy</button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">Rent</button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button className="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact-tab-pane" type="button" role="tab" aria-controls="contact-tab-pane" aria-selected="false">Build</button>
                    </li>
                
                  </ul>
                  <div className="tab-content" id="myTabContent">
                    <div className="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabIndex="0">
                      <div className="row align-items-center hero_search_fields">
                        <div className="col position-relative">
                          <input type="text" placeholder='Location' className=' form-control w-100' />
                          <i className="fa-solid fa-location-dot"></i>
                        </div>
                        <div className="col position-relative">
                          <input type="text" placeholder='Budget' className=' form-control w-100' />
                          <i className="fa-solid fa-dollar"></i>
                        </div>
                        <div className="col position-relative">
                          <select className="form-select" aria-label="Default select example">
                            <option selected>Bedrooms</option>
                            <option value="1">1 Bedroom</option>
                            <option value="2">2 Bedrooms</option>
                            <option value="36">3 Bedrooms</option>
                            <option value="3+">3+ Bedrooms</option>
                          </select>
                          <i className="fa-solid fa-home"></i>
                        </div>
                        <div className="col position-relative">
                          <select className="form-select" aria-label="Default select example">
                            <option selected>Energy rating</option>
                            <option value="7 Star+">7 Star+</option>
                            <option value="Passivhaus">Passivhaus</option>
                            <option value="Passivhaus">Passivhaus</option>
                            <option value="Green Star">Green Star</option>
                          </select>
                          <i className="fa-solid fa-lightbulb"></i>
                        </div>
                        
                        <div className="col-md-1 ps-lg-0">
                          <button className="nav_search">
                            <i className="fa-solid fa-magnifying-glass"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabIndex="0">
        <div className="row align-items-center hero_search_fields">
                        <div className="col position-relative">
                          <input type="text" placeholder='Location' className=' form-control w-100' />
                          <i className="fa-solid fa-location-dot"></i>
                        </div>
                        <div className="col position-relative">
                          <input type="text" placeholder='Budget' className=' form-control w-100' />
                          <i className="fa-solid fa-dollar"></i>
                        </div>
                        <div className="col position-relative">
                          <select className="form-select" aria-label="Default select example">
                            <option selected>Bedrooms</option>
                            <option value="1">1 Bedroom</option>
                            <option value="2">2 Bedrooms</option>
                            <option value="36">3 Bedrooms</option>
                            <option value="3+">3+ Bedrooms</option>
                          </select>
                          <i className="fa-solid fa-home"></i>
                        </div>
                        <div className="col position-relative">
                          <select className="form-select" aria-label="Default select example">
                            <option selected>Energy rating</option>
                            <option value="7 Star+">7 Star+</option>
                            <option value="Passivhaus">Passivhaus</option>
                            <option value="Passivhaus">Passivhaus</option>
                            <option value="Green Star">Green Star</option>
                          </select>
                          <i className="fa-solid fa-lightbulb"></i>
                        </div>
                        
                        <div className="col-md-1 ps-lg-0">
                          <button className="nav_search">
                            <i className="fa-solid fa-magnifying-glass"></i>
                          </button>
                        </div>
                      </div>

                    </div>
                    <div className="tab-pane fade" id="contact-tab-pane" role="tabpanel" aria-labelledby="contact-tab" tabIndex="0">
                        <div className="row justify-content-center align-items-center hero_search_fields">
                        <div className="col position-relative">
                          <input type="text" placeholder='Location' className=' form-control w-100' />
                          <i className="fa-solid fa-location-dot"></i>
                        </div>
                        <div className="col position-relative">
                          <input type="text" placeholder='Budget' className=' form-control w-100' />
                          <i className="fa-solid fa-dollar"></i>
                        </div>
                        <div className="col position-relative">
                          <select className="form-select" aria-label="Default select example">
                            <option selected>Bedrooms</option>
                            <option value="1">1 Bedroom</option>
                            <option value="2">2 Bedrooms</option>
                            <option value="36">3 Bedrooms</option>
                            <option value="3+">3+ Bedrooms</option>
                          </select>
                          <i className="fa-solid fa-home"></i>
                        </div>
                        <div className="col position-relative">
                          <select className="form-select" aria-label="Default select example">
                            <option selected>Energy rating</option>
                            <option value="7 Star+">7 Star+</option>
                            <option value="Passivhaus">Passivhaus</option>
                            <option value="Passivhaus">Passivhaus</option>
                            <option value="Green Star">Green Star</option>
                          </select>
                          <i className="fa-solid fa-lightbulb"></i>
                        </div>
                        
                        <div className="col-md-1 ps-lg-0">
                          <button className="nav_search">
                            <i className="fa-solid fa-magnifying-glass"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default HeroBanner