import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CTA from "../components/CTA";

const faqData = {
  All: [
    {
      question: "How do I search for properties?",
      answer:
        "Our powerful search tool allows you to filter properties based on location, property type, price range, number of bedrooms, bathrooms, and additional amenities. You can also sort results by newest listings, price, or popularity to quickly find homes that meet your specific needs."
    },
    {
      question: "Can I save properties I like?",
      answer:
        "Absolutely! You can click the heart icon on any property card to save it to your watchlist. These saved listings will be accessible from your dashboard, allowing you to track price changes, receive updates, or revisit them anytime without starting your search over."
    },
    {
      question: "Do I need an account to browse listings?",
      answer:
        "No, you can freely browse all listings without signing up. However, creating a free account unlocks advanced features like saving properties, creating alerts, messaging agents directly, and accessing your personalized dashboard."
    },
    {
      question: "What kind of properties are listed?",
      answer:
        "Our platform includes residential homes, apartments, land plots, rental units, and commercial properties. Whether you’re buying your first home, renting, or investing, our listings cater to all real estate needs across various budgets."
    },
    {
      question: "How often are listings updated?",
      answer:
        "Listings are updated daily to ensure you see the most accurate and current information. Agents and owners can edit their listings in real-time, which means price changes, availability, or inspection dates are reflected immediately."
    }
  ],
  Buy: [
    {
      question: "Do I need a pre-approval to buy?",
      answer:
        "While not strictly required, getting pre-approved for a mortgage gives you a significant advantage. It tells sellers that you're serious, financially capable, and can speed up the closing process. A lender will evaluate your credit score, debt-to-income ratio, and income to give you a pre-approved amount."
    },
    {
      question: "How much down payment is required?",
      answer:
        "Typically, homebuyers are expected to pay between 10% to 20% of the property price as a down payment. However, this can vary depending on the loan type. Some government-backed loans may allow as low as 3.5%, while larger down payments can help avoid mortgage insurance."
    },
    {
      question: "Are there additional costs when buying a property?",
      answer:
        "Yes. Apart from the property price, buyers should account for closing costs (2–5% of the purchase price), property taxes, homeowners insurance, title fees, inspection charges, and potential HOA fees. Your agent or lender can give you an itemized cost estimate."
    },
    {
      question: "Can I buy a property without a real estate agent?",
      answer:
        "While it's possible to buy directly from an owner, having an agent simplifies negotiations, paperwork, inspections, and ensures your legal interests are protected. Agents can also access off-market listings and guide you through the full transaction."
    },
    {
      question: "How do I know if a property is fairly priced?",
      answer:
        "Agents use comparative market analysis (CMA) to evaluate similar properties in the area. You can also use online tools and property history to gauge pricing trends. Key indicators include neighborhood demand, home condition, amenities, and recent nearby sales."
    }
  ],
  Sell: [
    {
      question: "How do I list my property?",
      answer:
        "Log in to your account and go to your dashboard. Click on 'List Property' and fill in details such as address, property type, price, photos, and description. Once submitted, your listing will be reviewed and published within 24 hours."
    },
    {
      question: "Are there any listing fees?",
      answer:
        "Basic property listings are free. However, we offer premium upgrades like featured spots, homepage banners, and video tours at a small additional cost. These increase visibility and can help sell faster."
    },
    {
      question: "What documents do I need to list a home?",
      answer:
        "You’ll typically need proof of ownership, property tax records, recent utility bills, and identification. If you’re working with an agent, they may also require a signed agreement to list on your behalf."
    },
    {
      question: "How do I attract more buyers to my listing?",
      answer:
        "Great photography, a compelling description, accurate pricing, and timely responses to inquiries help boost interest. Consider upgrading your listing to a premium package to appear at the top of search results and reach a wider audience."
    },
    {
      question: "Can I edit my listing after publishing?",
      answer:
        "Yes. Simply go to your dashboard, open the listing, and click 'Edit'. You can change photos, update the price, correct descriptions, or mark it as sold or under contract anytime."
    }
  ],
  Agents: [
    {
      question: "How can I contact an agent?",
      answer:
        "Each listing has a 'Contact Agent' button. You can message them directly through our platform or call using the provided phone number. Agents typically respond within 24 hours and can help arrange inspections or answer detailed questions."
    },
    {
      question: "Can I follow an agent for updates?",
      answer:
        "Yes! Visit the agent’s profile and click the 'Follow' button. You’ll be notified when they post new listings, reduce prices, or host open inspections, helping you stay in the loop on their portfolio."
    },
    {
      question: "How are agents verified on the platform?",
      answer:
        "Agents undergo a manual verification process that includes checking licenses, brokerage affiliation, and professional history. Verified agents display a badge on their profile, ensuring you’re working with legitimate professionals."
    },
    {
      question: "What if I have a bad experience with an agent?",
      answer:
        "We take agent professionalism seriously. You can report issues through the agent's profile or by contacting our support team. We review all complaints and may take action including warnings, suspensions, or removals if necessary."
    },
    {
      question: "Can agents help with legal paperwork?",
      answer:
        "Yes. Most agents assist with contracts, disclosures, and offer submission. However, for complex legal or financial issues, it’s recommended to consult with a real estate attorney or mortgage advisor alongside your agent."
    }
  ]
};


const tabs = ["All", "Buy", "Sell", "Agents"];

const FAQPage = () => {
  const [activeTab, setActiveTab] = useState("All");

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
                Agents: "fas fa-user-tie",
                };

                return (
                <li className="nav-item" key={tab}>
                    <button
                    className={`nav-link d-flex align-items-center gap-1 ${activeTab === tab ? "active" : ""}`}
                    onClick={() => setActiveTab(tab)}
                    >
                    <i className={icons[tab]}></i>
                    {tab}<span className="faq_ques">Questions</span>
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
