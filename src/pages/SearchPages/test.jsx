import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsSticky(window.scrollY > 150);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <header className="main-header" >
               

               

                <nav className={`navbar  ${isSticky ? 'sticky-nav' : ''}`}>
                    <div className="container">
                            
                            <Link className="navbar-brand me-0" href="#"><img src="/images/logo2.png" alt="" /></Link>
                            
                             <div className="d-none d-lg-block">
                                    <ul className="navbar-nav  mx-auto mb-2 mb-lg-0 d-flex justify-content-between flex-row">
                                    <li className="nav-item">
                                        <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to='/homes' >Listing</Link>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <Link className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Categories
                                        </Link>
                                        <ul className="dropdown-menu">
                                            <li><Link className="dropdown-item" href="#">Builders </Link></li>
                                            <li><Link className="dropdown-item" href="#">Architects </Link></li>
                                            <li><Link className="dropdown-item" href="#">Building Designer</Link></li>
                                            <li><Link className="dropdown-item" href="#">Energy Consultants</Link></li>
                                            <li><Link className="dropdown-item" href="#">Energy Consultants</Link></li>
                                            <li><Link className="dropdown-item" href="#">Passivhaus Designers / Certifiers  </Link></li>
                                            <li><Link className="dropdown-item" href="#">Green Star</Link></li>
                                            <li><Link className="dropdown-item" href="#">Sustainable high performance builders</Link></li>
                                            <li><Link className="dropdown-item" href="#">Product & Material Suppliers </Link></li>
                                        </ul>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <Link className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Agencies
                                        </Link>
                                        <ul className="dropdown-menu">
                                            <li><Link className="dropdown-item" href="#">Agency 1</Link></li>
                                            <li><Link className="dropdown-item" href="#">Agency 2</Link></li>
                                            <li><Link className="dropdown-item" href="#">Agency 3</Link></li>
                                        </ul>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link " aria-disabled="true">Contact Us</Link>
                                    </li>
                                </ul>
                                 </div>


                              <div className='d-flex align-items-center justify-content-end'>
                           <div className="d-flex align-items-center">
                            <i className="fa-regular fa-user-circle"></i>
                             <Link className='nav-link ms-1 login_btn'  to="/login">Login</Link>
                           </div>

                        <div className='d-none d-lg-block'>
                           <Link className="ud-btn btn-white add-property bdrs60 ms-2 ms-xl-4 " href="/">Add Property<i className="fa-solid fa-arrow-right-long"></i></Link>

                        </div>

                        <img className='ms-3 d-block d-lg-none' src="/images/toggle_icon.svg" alt="" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation" />


                         
                       </div>

                     
                       
                       
                        <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                            <div className="offcanvas-body">
                            <div className="offcanvas-header py-2">
                                <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Healthy Home Match</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                            </div>
                            <hr className='my-2' />
                                <ul className="navbar-nav justify-content-end flex-grow-1 p-0">
                                  <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to='/homes' >Listing</Link>
                            </li>
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Categories
                                </Link>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" href="#">Builders </Link></li>
                                    <li><Link className="dropdown-item" href="#">Architects </Link></li>
                                    <li><Link className="dropdown-item" href="#">Building Designer</Link></li>
                                    <li><Link className="dropdown-item" href="#">Energy Consultants</Link></li>
                                    <li><Link className="dropdown-item" href="#">Energy Consultants</Link></li>
                                    <li><Link className="dropdown-item" href="#">Passivhaus Designers / Certifiers  </Link></li>
                                    <li><Link className="dropdown-item" href="#">Green Star</Link></li>
                                    <li><Link className="dropdown-item" href="#">Sustainable high performance builders</Link></li>
                                    <li><Link className="dropdown-item" href="#">Product & Material Suppliers </Link></li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Agencies
                                </Link>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" href="#">Agency 1</Link></li>
                                    <li><Link className="dropdown-item" href="#">Agency 2</Link></li>
                                    <li><Link className="dropdown-item" href="#">Agency 3</Link></li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link " aria-disabled="true">Contact Us</Link>
                            </li>
                                 
                                </ul>
                               
                            </div>
                        </div>
                    </div>
                </nav>


            </header>
        </>
    );
};

export default Navbar;
