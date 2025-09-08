import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CTA from "../components/CTA";
import { useLocation } from "react-router-dom";

const faqData = {
  All: [
    { question: "How do I search for properties?", answer: "Our powerful search tool allows you to filter properties based on location, property type, price range, bedrooms, bathrooms, and amenities. You can also sort results by newest listings or price." },
    { question: "Can I save properties I like?", answer: "Yes! Click the heart icon on any property card to save it to your watchlist. Access your saved listings anytime from your dashboard." },
    { question: "Do I need an account to browse listings?", answer: "No account is required to browse. Creating an account unlocks features like saving properties, creating alerts, and messaging agents." },
    { question: "What kind of properties are listed?", answer: "We list residential homes, apartments, land plots, rental units, and commercial properties across Australia." },
    { question: "How often are listings updated?", answer: "Listings are updated daily. Price changes, availability, and inspection dates are reflected immediately." }
  ],
  Buy: [
    { question: "Do I need a pre-approval to buy?", answer: "Getting pre-approved for a mortgage is recommended. It shows sellers you are serious and financially capable, speeding up the closing process." },
    { question: "How much down payment is required?", answer: "Typically 10-20% of the property price, but government-backed loans may allow as low as 3.5%." },
    { question: "Are there additional costs when buying?", answer: "Yes, including closing costs, taxes, insurance, title fees, inspections, and potential HOA fees." },
    { question: "Can I buy without an agent?", answer: "Yes, but agents simplify negotiations, paperwork, inspections, and legal protections." },
    { question: "How do I know if a property is fairly priced?", answer: "Use Comparative Market Analysis (CMA) and online tools. Consider neighborhood demand, amenities, and recent sales." }
  ],
  Sell: [
    { question: "How do I list my property?", answer: "Log in, go to your dashboard, click 'List Property', fill in details, and submit. Your listing will be reviewed and published within 24 hours." },
    { question: "Are there listing fees?", answer: "Basic listings are free. Premium upgrades like featured spots or video tours may cost extra." },
    { question: "What documents are needed?", answer: "Proof of ownership, tax records, recent utility bills, ID, and agent agreements if applicable." },
    { question: "How do I attract buyers?", answer: "Great photos, compelling descriptions, accurate pricing, and timely responses help. Premium listings increase visibility." },
    { question: "Can I edit my listing?", answer: "Yes, go to your dashboard, open the listing, click 'Edit' to update photos, price, or description." }
  ],
  Rent: [
    { question: "How do I find rental properties?", answer: "Use our search filters for location, price, and property type. You can also sort by newest listings or popularity." },
    { question: "What documents are required to rent?", answer: "Typically ID, proof of income, rental history, and references. Some landlords may require a rental application fee." },
    { question: "Can I apply online?", answer: "Yes, most rental applications can be submitted online through our platform." },
    { question: "How do I pay rent?", answer: "Rent is usually paid via bank transfer or direct debit to the landlord or property manager. Your dashboard may provide payment tracking." },
    { question: "Can I negotiate lease terms?", answer: "Yes, you can discuss lease duration, move-in dates, and other conditions directly with the landlord or agent." }
  ],
  Agents: [
    { question: "How can I contact an agent?", answer: "Use the 'Contact Agent' button on listings or call directly using the number provided." },
    { question: "Can I follow an agent?", answer: "Yes, visit their profile and click 'Follow' to get notifications about new listings and updates." },
    { question: "How are agents verified?", answer: "Agents are verified via license checks, brokerage affiliation, and professional history. Verified agents have a badge." },
    { question: "What if I have a bad experience?", answer: "Report issues through the agent profile or contact support. We review complaints and may take action if necessary." },
    { question: "Can agents assist with contracts?", answer: "Yes, most agents help with contracts, disclosures, and offer submissions, but complex legal issues should involve a solicitor." }
  ],
  Account: [
    { question: "How do I create an account?", answer: "Click 'Sign Up', enter your details, and verify your email. You can then access your dashboard." },
    { question: "How do I reset my password?", answer: "Click 'Forgot Password' on the login page and follow the instructions to reset it." },
    { question: "Can I update my profile info?", answer: "Yes, go to your account settings and update your personal information, contact details, and preferences." },
    { question: "How do I delete my account?", answer: "Go to settings > delete account. Note: this action is permanent and will remove all saved data." },
    { question: "Can I manage notifications?", answer: "Yes, in account settings, choose which alerts and notifications you want to receive via email or SMS." }
  ],
  Payments: [
    { question: "What payment methods are accepted?", answer: "We accept bank transfers, credit/debit cards, and direct debit for applicable services." },
    { question: "How do I view my payment history?", answer: "Go to your dashboard and click 'Payment History' to see past transactions." },
    { question: "Are there fees for transactions?", answer: "Some services may include small processing fees. Details are displayed before confirming payments." },
    { question: "Can I update my payment details?", answer: "Yes, go to account settings > payment methods to update your card or bank info." },
    { question: "Is my payment information secure?", answer: "Yes, all payments are processed through secure, encrypted systems complying with Australian data protection standards." }
  ]
};



const tabs = ["All", "Buy", "Sell", "Rent", "Agents", "Account", "Payments"];

const FAQPage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const category = params.get("category"); 
  // console.log(category)

  const [activeTab, setActiveTab] = useState("All");

   useEffect(() => {
    if (category && tabs.includes(category)) {
      setActiveTab(category);
    }
  }, [category]);

  return (
    <div className="faq_page">
        <Navbar />
        <div className="container py-5">
        <h1 className="mb-4 sec-title">Frequently Asked Questions</h1>

        {/* Tabs */}
       <ul className="nav nav-tabs mb-4">
            {tabs.map((tab) => {
                const icons = {
                All: "fas fa-question-circle",
                Buy: "fas fa-home",
                Sell: "fas fa-dollar-sign",
                Rent: "fas fa-key",
                Agents: "fas fa-user-tie",
                Account: "fas fa-user",
                Payments: "fas fa-credit-card",
                };

                return (
                <li className="nav-item" key={tab}>
                    <button
                    className={`nav-link d-flex align-items-center gap-1 ${activeTab === tab ? "active" : ""}`}
                    onClick={() => setActiveTab(tab)}
                    >
                    <i className={icons[tab]}></i>
                    {tab}
                    {/* <span className="faq_ques">Questions</span> */}
                    </button>
                </li>
                );
            })}
        </ul>


        {/* Accordion */}
        <div className=" accordion-style1">
            <div className="accordion" id="faqAccordion">
                {faqData[activeTab].map((faq, index) => {
                const itemId = `${activeTab}-faq-${index}`;
                const isFirst = index === 0; // Check if it's the first item
                return (
                    <div className="accordion-item" key={itemId}>
                    <h2 className="accordion-header" id={`heading-${itemId}`}>
                        <button
                        className={`accordion-button ${isFirst ? "" : "collapsed"}`}
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#collapse-${itemId}`}
                        aria-expanded={isFirst ? "true" : "false"}
                        aria-controls={`collapse-${itemId}`}
                        >
                        {faq.question}
                        </button>
                    </h2>
                    <div
                        id={`collapse-${itemId}`}
                        className={`accordion-collapse collapse ${isFirst ? "show" : ""}`}
                        aria-labelledby={`heading-${itemId}`}
                        data-bs-parent="#faqAccordion"
                    >
                        <div className="accordion-body">{faq.answer}</div>
                    </div>
                    </div>
                );
                })}

            </div>
        </div>
        </div>

        <CTA />
        <Footer />
    </div>
  );
};

export default FAQPage;
