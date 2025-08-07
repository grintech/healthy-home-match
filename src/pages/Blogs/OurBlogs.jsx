import Navbar from '../../components/Navbar';
import { Link } from 'react-router-dom';
import './blog.css';
import { useState } from 'react';
import Footer from '../../components/Footer';

// Your sample blog data (extend this data to reflect all the categories if needed)
const blogData = [
  {
    id: 1,
    image: "/images/blog1.jpg",
    month: "July",
    day: "28",
    tag: "Selling a Home",
    title: "Private Contemporary Home Balancing Openness",
  },
  {
    id: 2,
    image: "/images/blog2.jpg",
    month: "June",
    day: "15",
    tag: "Selling a Home",
    title: "How to Stage Your Home for a Quick Sale",
  },
  {
    id: 3,
    image: "/images/blog3.jpg",
    month: "May",
    day: "09",
    tag: "Renting a Home",
    title: "Finding the Perfect Rental Home",
  },
  {
    id: 4,
    image: "/images/blog4.jpg",
    month: "April",
    day: "22",
    tag: "Renting a Home",
    title: "What to Look for in Your First Rental Property",
  },
  {
    id: 5,
    image: "/images/blog3.jpg",
    month: "March",
    day: "05",
    tag: "Buying a Home",
    title: "Tips for First-Time Home Buyers",
  },
  {
    id: 6,
    image: "/images/blog4.jpg",
    month: "February",
    day: "10",
    tag: "Buying a Home",
    title: "How to Buy a Home in a Competitive Market",
  },
  {
    id: 7,
    image: "/images/blog2.jpg",
    month: "January",
    day: "18",
    tag: "Finance",
    title: "Understanding Mortgage Rates and Terms",
  },
  {
    id: 8,
    image: "/images/blog1.jpg",
    month: "December",
    day: "11",
    tag: "Finance",
    title: "How to Secure Financing for Your New Home",
  },
//   {
//     id: 9,
//     image: "/images/blog9.jpg",
//     month: "November",
//     day: "25",
//     tag: "All",
//     title: "The Ultimate Guide to Buying and Selling Homes",
//   },
//   {
//     id: 10,
//     image: "/images/blog10.jpg",
//     month: "October",
//     day: "05",
//     tag: "All",
//     title: "Everything You Need to Know About Real Estate",
//   }
];

const blogTabs = ["All", "Selling a Home", "Renting a Home", "Buying a Home", "Finance"];

const OurBlogs = () => {
  const [activeTab, setActiveTab] = useState("All");

  // Filter blogs 
  const filterBlogs = (tab) => {
    if (tab === "All") {
      return blogData;  
    }
    return blogData.filter((blog) => blog.tag === tab); 
  };

  return (
    <div className='blogs_page'>

      <Navbar />
      <div className="container py-5">
        <h1 className="sec-title">Blogs</h1>
        <div className="breadcumb-list">
          <Link to="/">Home</Link>
          <span className='mx-1'>/</span>
          <Link to="/blogs">Blogs</Link>
        </div>

        {/* Blog Cards */}
        <div className="our_blogs mt-4">
            {/* Tabs Navigation */}
            <div className="filter-menu mb-3">
                {blogTabs.map((tab, index) => (
                <button
                    key={index}
                    className={`th-btn tab-btn ${activeTab === tab ? 'active' : '' } me-2 mb-2`}
                    onClick={() => setActiveTab(tab)}  
                >
                    {tab}
                </button>
                ))}
            </div>

            <div className="row">
                {filterBlogs(activeTab).map((blog) => (
                <div className="col-lg-4 col-md-6" key={blog.id}>
                    <div className="blog-style1">
                    <div className="blog-img">
                        <img
                        alt="blog"
                        src={blog.image}
                        className="w-100"
                        loading="lazy"
                        />
                    </div>
                    <div className="blog-content">
                        <div className="date">
                        <span className="month">{blog.month}</span>
                        <span className="day">{blog.day}</span>
                        </div>
                        <div className="tag" to="#">
                        {blog.tag}
                        </div>
                        <h6 className="title mt-1">
                        <Link to={`/blog/${blog.title}`}>{blog.title}</Link>
                        </h6>
                    </div>
                    </div>
                </div>
                ))}
            </div>

            <div className="d-flex justify-content-center mt-3">
                <nav aria-label="Page navigation example">
                    <ul className="pagination mb-0">
                    <li className="page-item">
                        <Link className="page-link" to="#" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                        </Link>
                    </li>
                    <li className="page-item"><Link className="page-link active" to="#">1</Link></li>
                    <li className="page-item"><Link className="page-link " to="#">2</Link></li>
                    <li className="page-item">
                        <Link className="page-link" to="#" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                        </Link>
                    </li>
                    </ul>
                </nav>
            </div>

        </div>

      </div>


      <Footer />

    </div>
  );
};

export default OurBlogs;
