import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaHome, FaFileAlt, FaCheckCircle, FaMoneyCheckAlt, FaUniversity } from "react-icons/fa";
import { toast } from "react-toastify";

const financePlans = [
  { id: 1, title: "Standard Home Loan", rate: "7.2%", tenure: "15–30 years", downPayment: "20%", icon: <FaUniversity size={40} className="text-theme mb-3" /> },
  { id: 2, title: "Green Home Loan", rate: "6.5%", tenure: "15–25 years", downPayment: "15%", icon: <FaUniversity size={40} className="text-theme mb-3" /> },
  { id: 3, title: "Low Down Payment Loan", rate: "8%", tenure: "10–20 years", downPayment: "10%", icon: <FaUniversity size={40} className="text-theme mb-3" /> },
];

const faqs = [
  { question: "Who is eligible for a home loan?", answer: "Individuals aged 21–65 with stable income are eligible." },
  { question: "What documents are required?", answer: "ID proof, income proof, bank statements, and property details." },
  { question: "Can I prepay my loan?", answer: "Yes, partial or full prepayment is allowed with no penalty for some plans." },
];

const partnerBanks = [
  { id: 1, name: "Commonwealth Bank", image: "/images/partner/partner3.png" },
  { id: 2, name: "ANZ Bank", image: "/images/partner/partner2.png" },
  { id: 3, name: "Westpac", image: "/images/partner/partner1.png" },
  { id: 4, name: "NAB", image: "/images/partner/partner4.png" },
];


const GetFinancePage = () => {
  const [loanAmount, setLoanAmount] = useState("");
  const [downPayment, setDownPayment] = useState("");
  const [tenure, setTenure] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [calculatedEMI, setCalculatedEMI] = useState(null);

  const handleFocus = (e) => e.target.placeholder = "";
  const handleBlurPlaceholder = (e, placeholder) => {
    if (!e.target.value) e.target.placeholder = placeholder;
  };

  const handleSubmit = () => {
    const loan = parseFloat(loanAmount);
    const down = parseFloat(downPayment);
    const time = parseFloat(tenure);
    const rate = parseFloat(interestRate);

    // Validation
    if (isNaN(loan) || isNaN(down) || isNaN(time) || isNaN(rate)) {
      toast.error("Please fill all fields with valid numbers!");
      return;
    }

    if (loan <= 0 || down < 0 || time <= 0 || rate <= 0) {
      toast.error("Values must be positive numbers!");
      return;
    }

    if (down > loan) {
      toast.error("Down Payment cannot exceed Loan Amount!");
      return;
    }

    // EMI calculation
    const principal = loan - down;
    const monthlyRate = rate / 12 / 100;
    const months = time * 12;
    const emiValue = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1);

    setCalculatedEMI(emiValue.toFixed(2));
  };

  return (
    <div className="get_finance_page">
      <Navbar />

      {/* Hero Section */}
      <section
        className="hero-section text-white d-flex align-items-center"
        style={{
          backgroundImage: "url('/images/loan.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "bottom",
          backgroundRepeat: "no-repeat",
          minHeight: "60vh",
          position: "relative",
        }}
      >
        <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.6)", zIndex: 1 }}></div>
        <div className="container text-center position-relative" style={{ zIndex: 2 }}>
          <h1 className="hero_title text-white mb-3">
            Get Financing for Your <span className="text-theme">Dream Home</span>
          </h1>
          <p className="lead mb-4">
            Fast, simple, and transparent home loan solutions tailored for Australian homeowners.
          </p>
        </div>
      </section>

      {/* Loan Calculator */}
      <section className="py-5 bg-white">
        <div className="container">
          <div className="row align-items-center g-4">
            <div className="col-lg-7 ">
              {/* <img src="/images/loan.jpg" alt="Home Financing" className="img-fluid w-100 rounded shadow" /> */}
                <h2 className="fw-bold mb-3">Calculate Your Home Loan Eligibility</h2>
                <p className="mb-4 text-muted">
                Use our easy-to-use loan calculator to estimate your monthly repayments.
                Understand how much you can borrow and plan your dream home budget accordingly.
                </p>
                <ul className="list-unstyled mb-4">
                <li className="mb-2"><i className="fas fa-check-circle text-theme me-2"></i>Quick and accurate calculations</li>
                <li className="mb-2"><i className="fas fa-check-circle text-theme me-2"></i>Compare different loan amounts and tenures</li>
                <li className="mb-2"><i className="fas fa-check-circle text-theme me-2"></i>Transparent interest rates and EMI estimation</li>
                </ul>
                <a href="#applyForm" className="btn ud-btn btn-white search_home_btn black_btn d-inline-flex">Apply Now</a>
            </div>

            <div className="col-lg-5">
              <div className="p-4 shadow-sm rounded bg-lgreen">
                <h4 className="mb-4  fw-bold">Eligibility Calculator</h4>

                <div className="mb-3">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Loan Amount"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(e.target.value)}
                    onFocus={handleFocus}
                    onBlur={(e) => handleBlurPlaceholder(e, "Loan Amount")}
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Down Payment"
                    value={downPayment}
                    onChange={(e) => setDownPayment(e.target.value)}
                    onFocus={handleFocus}
                    onBlur={(e) => handleBlurPlaceholder(e, "Down Payment")}
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Tenure (Years)"
                    value={tenure}
                    onChange={(e) => setTenure(e.target.value)}
                    onFocus={handleFocus}
                    onBlur={(e) => handleBlurPlaceholder(e, "Tenure (Years)")}
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Interest Rate (%)"
                    value={interestRate}
                    onChange={(e) => setInterestRate(e.target.value)}
                    onFocus={handleFocus}
                    onBlur={(e) => handleBlurPlaceholder(e, "Interest Rate (%)")}
                  />
                </div>

                <button className="btn btn-green w-100 py-2" onClick={handleSubmit}>
                  Submit
                </button>

                {calculatedEMI && (
                  <h5 className="mt-3 text-center text-white fw-bold">
                    Estimated EMI: <span className="text-theme">${calculatedEMI}</span> / month
                  </h5>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

       {/* How It Works */}
      <section className="py-5 bg-light">
        <div className="container text-center">
          <h2 className="sec-title mb-4">How It Works – Simple 4 Steps</h2>
          <div className="row g-4">
            <div className="col-sm-6 col-lg-3">
              <div className="p-4 bg-white shadow-sm rounded h-100 border" >
                <FaHome size={40} className="text-theme mb-3" />
                <h5 className="fw-bold text-green">Check Eligibility</h5>
                <p className="m-0">Provide basic info to see your loan eligibility.</p>
              </div>
            </div>
            <div className="col-sm-6 col-lg-3">
              <div className="p-4 bg-white shadow-sm rounded h-100 border" >
                <FaMoneyCheckAlt size={40} className="text-theme mb-3" />
                <h5 className="fw-bold text-green">Compare Options</h5>
                <p className="m-0">Review interest rates, tenure, and plans available.</p>
              </div>
            </div>
            <div className="col-sm-6 col-lg-3">
              <div className="p-4 bg-white shadow-sm rounded h-100 border" >
                <FaFileAlt size={40} className="text-theme mb-3" />
                <h5 className="fw-bold text-green">Submit Application</h5>
                <p className="m-0">Attach documents and submit your loan application online.</p>
              </div>
            </div>
            <div className="col-sm-6 col-lg-3">
              <div className="p-4 bg-white shadow-sm rounded h-100 border" >
                <FaCheckCircle size={40} className="text-theme mb-3" />
                <h5 className="fw-bold text-green">Approval & Fund</h5>
                <p className="m-0">Get approved quickly and receive the funds to build your dream home.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Finance Plans */}
      <section className="py-5 bg-green finance_plan">
        <div className="container text-center">
          <h2 className="sec-title text-white mb-4">Finance Plans</h2>
          <div className="row g-4 justify-content-center ">
            {financePlans.map((plan) => (
              <div key={plan.id} className="col-sm-6 col-lg-4">
                <div className=" text-dark finance_plan_card p-4 h-100 hover-shadow d-flex flex-column justify-content-center" >
                  <div className="mb-2 ">{plan.icon}</div>
                  <h5 className="fw-bold mb-3">{plan.title}</h5>
                  <p><strong>Interest Rate:</strong> {plan.rate}</p>
                  <p><strong>Tenure:</strong> {plan.tenure}</p>
                  <p><strong>Down Payment:</strong> {plan.downPayment}</p>
                  <button className="btn ud-btn btn-white search_home_btn black_btn mt-2">Select Plan</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

        {/* FAQs */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="sec-title mb-4 text-center">FAQs</h2>
           <div className="accordion-style1">
            <div className="accordion" id="faqAccordion">
                {faqs.map((faq, index) => (
                <div className="accordion-item" key={index}>
                    <h2 className="accordion-header" id={`heading${index}`}>
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${index}`} aria-expanded="false" aria-controls={`collapse${index}`}>
                        {faq.question}
                    </button>
                    </h2>
                    <div id={`collapse${index}`} className="accordion-collapse collapse" aria-labelledby={`heading${index}`} data-bs-parent="#faqAccordion">
                    <div className="accordion-body">{faq.answer}</div>
                    </div>
                </div>
                ))}
            </div>
           </div>
        </div>
      </section>

       {/* Application Form */}
      <section id="applyForm" className="py-5 bg-white">
        <div className="container">
          <h2 className="sec-title mb-4 text-center">Apply for Home Loan</h2>
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="p-4 shadow-sm rounded bg-green">
                <form className="row g-3">
                  <div className="col-md-6">
                    <input type="text" className="form-control" placeholder="Full Name" />
                  </div>
                  <div className="col-md-6">
                    <input type="email" className="form-control" placeholder="Email" />
                  </div>
                  <div className="col-md-6">
                    <input type="tel" className="form-control" placeholder="Phone Number" />
                  </div>
                  <div className="col-md-6">
                    <input type="number" className="form-control" placeholder="Property Value" />
                  </div>
                  <div className="col-md-6">
                    <input type="number" className="form-control" placeholder="Loan Amount" />
                  </div>
                  <div className="col-md-6">
                    <input type="number" className="form-control" placeholder="Down Payment" />
                  </div>
                  <div className="col-md-12">
                    <textarea className="form-control" rows="3" placeholder="Additional Message"></textarea>
                  </div>
                  <div className="col-md-12 d-flex justify-content-center">
                    <button type="submit" className="btn ud-btn btn-white search_home_btn ">Submit Application</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>    

      {/* Trusted Banks */}
      <section className="py-5 bg-lgreen text-center">
        <div className="container">
          <h2 className="sec-title mb-4">Our Trusted Banks</h2>
          <div className="d-flex justify-content-center flex-wrap gap-4 align-items-center">
            {partnerBanks.map((bank) => (
              <img key={bank.id} src={bank.image} alt={bank.name} style={{ height: "40px", objectFit: "contain" }} />
            ))}
          </div>
        </div>
      </section>



      <Footer />
    </div>
  );
};

export default GetFinancePage;
