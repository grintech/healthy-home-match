import { Link } from "react-router-dom";

const blogData = [
  {
    id: 1,
    image: "/images/blog1.jpg",
    month: "July",
    day: "28",
    tag: "Living Room",
    title: "Private Contemporary Home Balancing Openness",
    link: "/blogs/1",
  },
  {
    id: 2,
    image: "/images/blog2.jpg",
    month: "June",
    day: "15",
    tag: "Interior",
    title: "Modern Interiors for Your Urban Apartment Openness",
    link: "/blogs/2",
  },
  {
    id: 3,
    image: "/images/blog3.jpg",
    month: "May",
    day: "09",
    tag: "Architecture",
    title: "Sustainable Architecture for Green Living Openness",
    link: "/blogs/3",
  },
];

const Blogs = () => {
  return (
    <div className="our_blogs py-5">
      <div className="container">
        <h2 className="sec-title m-0">Our Blogs</h2>
        <p className="paragraph">Aliquam lacinia diam quis lacus euismod</p>
        <div className="row">
          {blogData.map((blog) => (
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
                  <Link className="tag" to="#">
                    {blog.tag}
                  </Link>
                  <h6 className="title mt-1">
                    <Link>{blog.title}</Link>
                  </h6>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
