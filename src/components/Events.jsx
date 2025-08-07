import { Link } from "react-router-dom"

const Events = () => {
  return (
    <>
        <div className="events_section">
            <div className="shape-mockup d-none d-xxl-block" >
            </div>
                <div className="row justify-content-center align-items-center py-5">
                  
                    <div className="col-lg-12">
                        <div className="container">
                            <h2 className=" mb-4 sec-title">Events</h2>
                            <div className="row ">
                                <div className="col-lg-4 col-md-4 mb-4 mb-lg-0">
                                    <div className="card h-100">
                                        <i className="fas fa-chalkboard-teacher"></i>
                                        <h3><Link>Industry Webinars</Link></h3>
                                        <p>Online sessions hosted by experts covering energy-efficient living and design.</p>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-4 mb-4 mb-lg-0">
                                     <div className="card h-100 ">
                                        <i className="fas fa-door-open"></i>
                                        <h3><Link>Open Homes</Link></h3>
                                        <p>Explore real examples of sustainable homes open for public viewing.</p>
                                    </div>
                                    
                                </div>
                                <div className="col-lg-4 col-md-4 mb-4 mb-lg-0 ">
                                     <div className="card h-100 ">
                                        <i className="fas fa-user-graduate"></i>
                                        <h3><Link>Training Sessions</Link></h3>
                                        <p>Professional education on green building, Passivhaus, and certifications.</p>
                                    </div>
                                    
                                </div>
                               
                            </div>


                        </div>
                    </div>
                </div>
            
        </div>
    </>
  )
}

export default Events