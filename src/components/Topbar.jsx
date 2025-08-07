import { Link } from "react-router-dom"

const Topbar = () => {
  return (
   <>
    <div className="header-top">
        <div className="container">
        <div className="row justify-content-center justify-content-lg-between align-items-center gy-2">
            <div className="col-auto d-none d-lg-block">
            <div className="header-links">
                <ul className="m-0 p-0">
                <li>
                    <i className="fa-solid fa-envelope"></i>
                    <Link href="mailto:infomailexample@mail.com">
                    infomailexample@mail.com
                    </Link>
                </li>
                <li>
                    <i className="fa-solid fa-phone"></i>
                    <Link href="tel:+0012345678900">+00 (123) 456 789 00</Link>
                </li>
                </ul>
            </div>
            </div>
            <div className="col-auto">
            <div className="header-links">
                <ul className="m-0 p-0">
                <li>
                    <div className="th-social">
                    <Link href="https://www.facebook.com/">
                        <i className="fab fa-facebook-f"></i>
                    </Link>
                    <Link href="https://www.twitter.com/">
                        <i className="fab fa-twitter"></i>
                    </Link>
                    <Link href="https://www.linkedin.com/">
                        <i className="fab fa-linkedin-in"></i>
                    </Link>
                    <Link href="https://www.whatsapp.com/">
                        <i className="fab fa-whatsapp"></i>
                    </Link>
                    </div>
                </li>
            
                </ul>
            </div>
            </div>
        </div>
        </div>
    </div>
   </>
  )
}

export default Topbar