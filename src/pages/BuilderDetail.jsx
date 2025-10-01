// src/pages/BuilderSingle.jsx
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import api from "../utils/axios";
import AgencySingleSkeleton from "../components/skeletons/AgencySingleSkeleton";

const BuilderSingle = () => {
  const { slug } = useParams();
  const [builder, setBuilder] = useState(null);
  const [loading, setLoading] = useState(true);

  const [modalImage, setModalImage] = useState(null);
  const [modalTitle, setModalTitle] = useState("");

  const [showFullText, setShowFullText] = useState(false);
  const [isTruncatable, setIsTruncatable] = useState(false);
  const descRef = useRef(null);
  const toggleText = () => setShowFullText((prev) => !prev);

  const [visibleCounts, setVisibleCounts] = useState({
    all: 4,
    completed: 4,
    ongoing: 4,
    upcoming: 4,
  });

  const handleShowMore = (type) =>
    setVisibleCounts((prev) => ({ ...prev, [type]: prev[type] + 4 }));
  const handleShowLess = (type) =>
    setVisibleCounts((prev) => ({ ...prev, [type]: 4 }));
  

  const handleImageClick = (img, title = "") => {
  setModalImage(buildFullUrl(img));
  setModalTitle(title || "Preview");
  const modal = new window.bootstrap.Modal(document.getElementById("imageModal"));
  modal.show();
};

  /* ----- Helpers ----- */
  const parseJSONSafe = (val) => {
    // If it's already an array or object return normalized array
    try {
      if (!val && val !== 0) return [];
      if (typeof val !== "string") {
        // arrays / objects
        if (Array.isArray(val)) return val;
        return [val];
      }
      const parsed = JSON.parse(val);
      if (Array.isArray(parsed)) return parsed;
      // If parsed is a string (e.g. "\"Builder of the year\"") -> return [string]
      if (typeof parsed === "string") return [parsed];
      // If parsed is object -> return [object]
      return [parsed];
    } catch (e) {
      // fallback: sometimes the API sends a simple string (not JSON)
      // remove wrapping quotes if present
      const cleaned = val.replace(/^"+|"+$/g, "");
      return cleaned ? [cleaned] : [];
    }
  };

  const buildFullUrl = (url) => {
    if (!url) return "";
    if (url.startsWith("http://") || url.startsWith("https://")) return url;
    if (url.startsWith("//")) return `https:${url}`;
    return `https://${url}`;
  };

  const isImage = (url) =>
    /\.(jpe?g|png|gif|webp|svg)(\?.*)?$/i.test(url || "");

  /*--- Fetch Builder API ----*/
  useEffect(() => {
    const fetchBuilder = async () => {
      try {
        const res = await api.get(`/builders/single/${slug}`);
        if (res.data.success && res.data.data) setBuilder(res.data.data);
        else setBuilder(null);
      } catch (err) {
        console.error("Error fetching builder:", err);
        setBuilder(null);
      } finally {
        setLoading(false);
      }
    };
    fetchBuilder();
  }, [slug]);

  useEffect(() => {
    if (descRef.current) {
      setIsTruncatable(descRef.current.scrollHeight > descRef.current.clientHeight);
    }
  }, [builder?.profile?.short_bio]);


//   const { profile = {}, experiences = [] } = builder;
  const profile = builder?.profile || {};
 const experiences = builder?.experiences || [];

  const completedProjects = experiences.filter((p) => p.status?.toLowerCase() === "completed");
  const ongoingProjects = experiences.filter((p) => p.status?.toLowerCase() === "ongoing");
  const upcomingProjects = experiences.filter((p) => p.status?.toLowerCase() === "upcoming");

  // parse awards / certificates safely
  const awardTitlesArr = parseJSONSafe(profile?.awards_title); // may return ['Builder of the year'] or []
  const awardImagesArr = parseJSONSafe(profile?.award_image); // may return ['s3://...jpg']
  const certificateArr = parseJSONSafe(profile?.cretificate); // may return [] or array of urls/objects

  // Build pairings between award titles and images
  const awards = [];
  // if awardTitlesArr contains single string that's actually a comma-separated list, keep it as single item.
  const maxLen = Math.max(awardTitlesArr.length, awardImagesArr.length);
  for (let i = 0; i < maxLen; i++) {
    awards.push({
      title: awardTitlesArr[i] ?? null,
      image: awardImagesArr[i] ?? null,
    });
  }
  // If no awards but images exist, push images alone
  if (awards.length === 0 && awardImagesArr.length) {
    awardImagesArr.forEach((img) => awards.push({ title: null, image: img }));
  }

  // Project Card UI
  const renderProjectCard = (project) => {
    let firstProof = "";
    try {
      const parsed = parseJSONSafe(project.verification_proof);
      firstProof = parsed.length ? parsed[0] : "";
    } catch (e) {
      firstProof = "";
    }
    return (
      <div className="col-md-6" key={project.id}>
        <Link to="/property-single  ">
          <div className="listing-style1 border mb-0 h-100">
            <div className="list-thumb">
              <img
                alt={project.project_name}
                className="card-img-top w-100"
                loading="lazy"
                src={firstProof ? buildFullUrl(firstProof) : "/images/default-property.png"}
                style={{ objectFit: "cover", height: 190 }}
              />
              <div className="sale-sticker-wrap p-2" style={{ position: "absolute", top: 10, left: 10 }}>
                <span className="badge bg-dark text-capitalize">{project.status}</span>
              </div>
            </div>
            <div className="card-body list-content">
              <h6 className="card-title list-title text-truncate text-green mb-2">{project.project_name}</h6>
              {/* <p className="list-text mb-1">{project.role}</p> */}
              <div className="list-meta d-flex align-items-center small ">
                <div className="me-3 text-capitalize "><i className="fa-solid fa-house me-1"></i>{project.property_type}</div>
                <div className=" text-capitalize"><i className="fa-solid fa-clock me-1"></i>{project.timeline}</div>
              </div>
              <hr className="my-2" />
              <p className="text-muted  m-0 p-0">{project.description}</p>
            </div>
          </div>
        </Link>
      </div>
    );
  };

  return (
    <div>
      <Navbar />

     {loading ? (
        <AgencySingleSkeleton />
    ) : !builder ? (
       <div  className="d-flex flex-column justify-content-center align-items-center" style={{ height: "80vh" }}  >
        <i className="fa-solid fa-home text-theme fs-1 loader-icon mb-2"></i>
        <h5 className="text-center fw-bold ">No builder Found</h5>
       </div>
    ) : (
        <>
           <div className="agency_single">

            {/* HERO / BANNER */}
            <div className="cta-agency cta-agen  py-5" style={{ background: "#d8f0ec" }}>
                <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-8 mb-4 mb-lg-0">
                    <div className="agent-single d-sm-flex align-items-center">
                        <div className="single-img mb-4 mb-sm-0 me-4">
                        <img
                            alt={builder.name}
                            src={profile?.profile_image ? buildFullUrl(profile.profile_image) : "/images/default_img.png"}
                            loading="lazy"
                            className="rounded-circle"
                            style={{ objectFit: "cover" }}
                        />
                        </div>
                        <div className="single-contant">
                        <h1 className="title mb-0 ">{builder.name}</h1>
                        <p className="mb-1 text-muted">{profile?.location}</p>
                        <div className="agent-meta mb-2 d-flex flex-column text-dark">

                          <div className="d-flex gap-2 mt-2">
                              <Link className="text-green"><i className="fa-brands fa-facebook fs-5 "></i></Link>
                              <Link className="text-green"><i className="fa-brands fa-instagram fs-5 "></i></Link>
                              <Link className="text-green"><i className="fa-brands fa-linkedin fs-5 "></i></Link>
                              <Link className="text-green"><i className="fa-brands fa-twitter fs-5 "></i></Link>
                          </div>
                            {/* {profile?.license_number && (
                            <div className="me-3"><i className="fa-solid fa-id-card me-1"></i><b>License : </b> {profile.license_number}</div>
                            )} */}
                            {/* {profile?.specialization && (
                            <div className="text-capitalize"><i className="fa-solid fa-home me-1"></i><b>Specialization :</b> {parseJSONSafe(profile.specialization).join(", ")}</div>
                            )} */}
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>

            <div className="container">
                <div className="row py-5">
                {/* LEFT COLUMN */}
                <div className="col-lg-8 mb-4 mb-lg-0 pe-lg-5">
                    {/* ABOUT */}
                    <div className="agent-single-details pb-4 bdrb1 mb-4">
                    <h5 className="mb-3 fw-bold">About Builder</h5>
                    <div
                        className={`text description-text ${showFullText ? "expanded" : ""}`}
                        ref={descRef}
                        style={{
                        maxHeight: !showFullText ? "7.5em" : "none",
                        overflow: "hidden",
                        lineHeight: "1.5em",
                        transition: "max-height 0.3s ease",
                        }}
                        dangerouslySetInnerHTML={{
                        __html: profile?.short_bio || "No description available.",
                        }}
                    />
                    {isTruncatable && (
                        <p className="fw-bold text-theme" style={{ cursor: "pointer" }} onClick={toggleText}>
                        {showFullText ? "Show less" : "Show more"}
                        </p>
                    )}
                    </div>

                

                    {/* PROJECTS TABS */}
                    <div className="row align-items-baseline mt-4 mb-2">
                    <div className="col-sm-4 mb-3 mb-sm-0">
                        <h5 className="fw-bold mb-0">Projects ({experiences.length})</h5>
                    </div>
                    <div className="col-sm-8">
                        <ul className="nav nav-pills mb-3 justify-content-start justify-content-sm-end">
                        <li className="nav-item">
                            <button className="nav-link active" data-bs-toggle="pill" data-bs-target="#pills-all" type="button">All</button>
                        </li>
                        <li className="nav-item">
                            <button className="nav-link" data-bs-toggle="pill" data-bs-target="#pills-completed" type="button">Completed</button>
                        </li>
                        <li className="nav-item">
                            <button className="nav-link" data-bs-toggle="pill" data-bs-target="#pills-ongoing" type="button">Ongoing</button>
                        </li>
                        <li className="nav-item">
                            <button className="nav-link" data-bs-toggle="pill" data-bs-target="#pills-upcoming" type="button">Upcoming</button>
                        </li>
                        </ul>
                    </div>
                    </div>

                    {/* TAB CONTENT */}
                    <div className="row py-4">
                    <div className="col-12">
                        <div className="tab-content p-0">
                        {/* All */}
                        <div className="tab-pane fade show active" id="pills-all">
                            <div className="row g-4">
                            {experiences.length ? (
                                <>
                                {experiences.slice(0, visibleCounts.all).map(renderProjectCard)}
                                {experiences.length > 4 && (
                                    <div className="col-12 d-flex justify-content-center mt-4">
                                    {visibleCounts.all < experiences.length ? (
                                        <button className="btn btn-outline-dark" onClick={() => handleShowMore("all")}>Show More</button>
                                    ) : (
                                        <button className="btn btn-outline-dark" onClick={() => handleShowLess("all")}>Show Less</button>
                                    )}
                                    </div>
                                )}
                                </>
                            ) : <p>No projects found.</p>}
                            </div>
                        </div>

                        {/* Completed */}
                        <div className="tab-pane fade" id="pills-completed">
                            <div className="row g-4">
                            {completedProjects.length ? completedProjects.map(renderProjectCard) : <p>No completed projects.</p>}
                            </div>
                        </div>

                        {/* Ongoing */}
                        <div className="tab-pane fade" id="pills-ongoing">
                            <div className="row g-4">
                            {ongoingProjects.length ? ongoingProjects.map(renderProjectCard) : <p>No ongoing projects.</p>}
                            </div>
                        </div>
                        
                        {/* Upcoming */}
                        <div className="tab-pane fade" id="pills-upcoming">
                            <div className="row g-4">
                            {upcomingProjects.length ? upcomingProjects.map(renderProjectCard) : <p>No upcoming projects.</p>}
                            </div>
                        </div>

                        </div>
                    </div>
                    </div>

                    <hr />

                    {/* AWARDS & CERTIFICATES */}
                    <div className="py-4">
                    <h5 className="mb-3 fw-bold">Awards & Certificates</h5>

                    {/* Awards */}
                    <div className="mb-4">
                        <h6 className="mb-2 fw-bold">Awards</h6>
                        {awards.length ? (
                        <div className="row g-3">
                            {awards.map((a, idx) => (
                            <div className="col-6 col-md-4" key={`award-${idx}`}>
                                <div
                                className="card h-100 shadow-sm"
                                style={{ cursor: a.image ? "pointer" : "default" }}
                                onClick={() => a.image && handleImageClick(a.image, a.title)}
                                >
                                {a.image ? (
                                    isImage(a.image) ? (
                                    <img
                                        src={buildFullUrl(a.image)}
                                        alt={a.title || `award-${idx}`}
                                        className="card-img-top"
                                        style={{ height: 140, objectFit: "cover" }}
                                    />
                                    ) : (
                                    <div className="p-3 text-center">
                                        <i className="fa-solid fa-file-arrow-down fa-2x"></i>
                                    </div>
                                    )
                                ) : (
                                    <div className="p-3 text-center text-muted">No image</div>
                                )}
                                <div className="card-body">
                                    <h6 className="mb-0 text-green m-0 fw-semibold">{a.title ?? "Award"}</h6>
                                </div>
                                </div>
                            </div>
                            ))}
                        </div>
                        ) : (
                        <p className="text-muted small mb-0">No awards listed.</p>
                        )}
                    </div>

                    {/* Certificates */}
                    <div>
                        <h6 className="mb-2 fw-bold">Certificates</h6>
                        {certificateArr.length ? (
                        <div className="row g-3">
                            {certificateArr.map((cert, i) => {
                            let url = "";
                            let name = "";
                            if (typeof cert === "string") {
                                url = cert;
                                name = cert.split("/").pop();
                            } else if (cert && typeof cert === "object") {
                                url = cert.url || cert.file || cert.path || cert.upload || "";
                                name =
                                cert.name ||
                                cert.title ||
                                (url && url.split("/").pop()) ||
                                `certificate-${i}`;
                            }
                            const full = buildFullUrl(url);
                            return (
                                <div className="col-6 col-md-3" key={`cert-${i}`}>
                                <div
                                    className="card h-100 text-center p-2 shadow-sm"
                                    style={{ cursor: isImage(url) ? "pointer" : "default" }}
                                    onClick={() => isImage(url) && handleImageClick(url, name)}
                                >
                                    <div className="p-2">
                                    {isImage(url) ? (
                                        <img
                                        src={full}
                                        alt={name}
                                        className="img-fluid rounded"
                                        style={{ height: 90, objectFit: "cover" }}
                                        />
                                    ) : (
                                        <i className="fa-solid fa-file-pdf fa-2x"></i>
                                    )}
                                    </div>
                                    {/* <div className="card-body small">
                                    <span className="d-inline-block">{name || "View"}</span>
                                    </div> */}
                                </div>
                                </div>
                            );
                            })}
                        </div>
                        ) : (
                        <p className="text-muted small mb-0">No certificates uploaded.</p>
                        )}
                    </div>
                    </div>


                </div>

                {/* RIGHT SIDEBAR */}
                <div className="col-lg-4">
                    <div className="agency_single_right">
                    <div className="agency_single_form mb-4">
                        <h5 className="form-title mb-4 fw-bold">Contact Builder</h5>
                        <form className="form-style1">
                        <div className="mb-3">
                            <input className="form-control" placeholder="Your Name" type="text" required />
                        </div>
                        <div className="mb-3">
                            <input className="form-control" placeholder="Phone" type="text" required />
                        </div>
                        <div className="mb-3">
                            <input className="form-control" placeholder="Email" type="email" required />
                        </div>
                        <div className="mb-3">
                            <select className="form-select" required>
                            <option value="">Select reason</option>
                            <option value="Project Enquiry">Project Enquiry</option>
                            <option value="visit-site">Visit Site</option>
                            <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <textarea className="form-control" rows="3" placeholder="Write message here..." required></textarea>
                        </div>
                        <button className="btn ud-btn btn-white search_home_btn w-100">Send Message</button>
                        </form>
                    </div>

                    <div className="agency_single_info border-0">
                        <div className="widget-wrapper mb-0">
                        <h6 className="title fw-bold mb-4">Other Information</h6>
                        {profile?.location && (
                            <div class="list-news-style d-flex align-items-baseline justify-content-between mb10">
                            <div class="flex-shrink-0"><h6 class="fw-bold mb-0">Address</h6> </div>
                            <div class="news-content flex-shrink-1 ms-3 text-end">
                                <p class="text mb-0 fz14">{profile.location}</p>
                            </div>
                        </div>
                        )}
                        {profile?.experience_years && (
                            <div class="list-news-style d-flex align-items-baseline justify-content-between mb10">
                            <div class="flex-shrink-0"><h6 class="fw-bold mb-0">Experience</h6> </div>
                            <div class="news-content flex-shrink-1 ms-3 text-end">
                                <p class="text mb-0 fz14">{profile.experience_years} years</p>
                            </div>
                            </div>
                        )}
                        {profile?.license_number && (
                            <div class="list-news-style d-flex align-items-baseline justify-content-between mb10">
                            <div class="flex-shrink-0"><h6 class="fw-bold mb-0">License</h6> </div>
                            <div class="news-content flex-shrink-1 ms-3 text-end">
                                <p class="text mb-0 fz14">{profile.license_number}</p>
                            </div>
                            </div>
                        )}
                        {profile?.website && (
                            <div class="list-news-style d-flex align-items-baseline justify-content-between mb10">
                            <div class="flex-shrink-0"><h6 class="fw-bold mb-0">Website</h6> </div>
                            <div class="news-content flex-shrink-1 ms-3 text-end">
                                <p class="text mb-0 fz14"><Link target="_blank" to={profile.website}>{profile.website}</Link></p>
                            </div>
                            </div>
                        )}
                        </div>
                    </div>
                    </div>
                </div>

                </div>
            </div>

          </div>

         {/* Image Modal */}
           <div
        className="modal fade"
        id="imageModal"
        tabIndex="-1"
        aria-labelledby="imageModalLabel"
        aria-hidden="true"
        >
        <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="fw-bold" id="imageModalLabel">{modalTitle}</h5>
                <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                ></button>
            </div>
            <div className="modal-body text-center">
                {modalImage && (
                <img
                    src={modalImage}
                    alt="Preview"
                    className="img-fluid rounded"
                    style={{ maxHeight: "70vh", objectFit: "contain" }}
                />
                )}
            </div>
            </div>
        </div>
           </div>
        </>

    )}

      <Footer />
    </div>
  );
};

export default BuilderSingle;
