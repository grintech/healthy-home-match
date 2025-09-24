import React, { useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { toast } from "react-toastify";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function MortgageCalculator() {
  const [homePrice, setHomePrice] = useState("");
  const [downPayment, setDownPayment] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [loanTerm, setLoanTerm] = useState("");
  const [propertyTax, setPropertyTax] = useState("");
  const [insurance, setInsurance] = useState("");
  const [results, setResults] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  // Placeholder state
  const [placeholders, setPlaceholders] = useState({
    homePrice: "$150000",
    downPayment: "$20000",
    interestRate: "5%",
    loanTerm: "30",
    propertyTax: "$200",
    insurance: "$250",
  });

  const parseCurrency = (val) => val.replace(/\$|,/g, "");

  const handleNumericInput = (e, setter) => {
    const rawValue = e.target.value.replace(/\$|,/g, "");
    if (/^\d*\.?\d*$/.test(rawValue)) {
      setter(rawValue);
    }
  };

  const handleBlurFormat = (value, setter) => {
    if (value) {
      const num = parseFloat(value);
      if (!isNaN(num)) {
        setter(num.toLocaleString());
      }
    }
  };

  const calculatePayment = () => {
    if (
      parseFloat(downPayment.replace(/\$|,/g, "")) >
      parseFloat(homePrice.replace(/\$|,/g, ""))
    ) {
      toast.error("Down Payment cannot exceed Home Price!");
      return;
    }

    if (!homePrice || !downPayment || !interestRate || !loanTerm) {
      toast.error(
        "Please fill the required fields!"
      );
      return;
    }

    const principal =
      parseFloat(parseCurrency(homePrice)) -
      parseFloat(parseCurrency(downPayment));

    const monthlyRate = parseFloat(interestRate) / 100 / 12;
    const totalMonths = parseInt(loanTerm) * 12;

    const monthlyPI =
      (principal *
        monthlyRate *
        Math.pow(1 + monthlyRate, totalMonths)) /
      (Math.pow(1 + monthlyRate, totalMonths) - 1);

    const monthlyTax = propertyTax
      ? parseFloat(parseCurrency(propertyTax)) / 12
      : 0;
    const monthlyInsurance = insurance
      ? parseFloat(parseCurrency(insurance)) / 12
      : 0;

    const totalPayment = monthlyPI + monthlyTax + monthlyInsurance;

    setResults({
      pi: monthlyPI.toFixed(2),
      tax: monthlyTax.toFixed(2),
      insurance: monthlyInsurance.toFixed(2),
      total: totalPayment.toFixed(2),
    });
  };

  const buildChartData = () => {
    if (!results) {
      return {
        labels: ["Principal & Interest"],
        datasets: [
          {
            data: [1],
            backgroundColor: ["#007bff"],
            borderWidth: 1,
          },
        ],
      };
    }

    const labels = ["Principal & Interest"];
    const data = [parseFloat(results.pi)];
    const colors = ["#007bff"];

    if (parseFloat(results.tax) > 0) {
      labels.push("Taxes");
      data.push(parseFloat(results.tax));
      colors.push("#ffc107");
    }

    if (parseFloat(results.insurance) > 0) {
      labels.push("Insurance");
      data.push(parseFloat(results.insurance));
      colors.push("#17a2b8");
    }

    return {
      labels,
      datasets: [
        {
          data,
          backgroundColor: colors,
          borderWidth: 1,
        },
      ],
    };
  };

  const handleFocus = (field) => {
    setPlaceholders((prev) => ({ ...prev, [field]: "" }));
  };

  const handleBlur = (field, value, setter, defaultPlaceholder) => {
    if (!value) {
      setPlaceholders((prev) => ({ ...prev, [field]: defaultPlaceholder }));
    }
    handleBlurFormat(value, setter);
  };

  return (
    <>
      <Navbar />
      <div className="container my-5 mortgage_page">
        <h1 className="mb-3 sec-title m-0">Mortgage Calculator</h1>

        <div className="row mt-4 g-4 align-items-center">
          <div className="col-lg-6 col-md-7 mb-4 mb-md-0">
            <div className="card border-0 shadow">
              <div className="row">
                <div className="mb-4 col-md-6">
                  <label className="form-label">
                    Home Price <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={homePrice ? `$${homePrice}` : ""}
                    placeholder={placeholders.homePrice}
                    onChange={(e) => handleNumericInput(e, setHomePrice)}
                    onFocus={() => handleFocus("homePrice")}
                    onBlur={() =>
                      handleBlur("homePrice", homePrice, setHomePrice, "$150000")
                    }
                  />
                </div>

                <div className="mb-4 col-md-6">
                  <label className="form-label">
                    Down Payment <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errorMessage ? "is-invalid" : ""}`}
                    value={downPayment ? `$${downPayment}` : ""}
                    placeholder={placeholders.downPayment}
                    onChange={(e) => {
                      handleNumericInput(e, setDownPayment);
                      const dp = parseFloat(e.target.value.replace(/\$|,/g, ""));
                      const hp = parseFloat(homePrice.replace(/,/g, ""));
                      if (!isNaN(dp) && !isNaN(hp) && dp > hp) {
                        setErrorMessage("Down Payment cannot exceed Home Price");
                      } else {
                        setErrorMessage("");
                      }
                    }}
                    onFocus={() => handleFocus("downPayment")}
                    onBlur={() =>
                      handleBlur("downPayment", downPayment, setDownPayment, "$20000")
                    }
                  />
                  {errorMessage && (
                    <div className="invalid-feedback d-block">{errorMessage}</div>
                  )}
                </div>

                <div className="mb-4 col-md-6">
                  <label className="form-label">
                    Interest Rate (%) <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={interestRate}
                    placeholder={placeholders.interestRate}
                    onChange={(e) => handleNumericInput(e, setInterestRate)}
                    onFocus={() => handleFocus("interestRate")}
                    onBlur={() =>
                      handleBlur("interestRate", interestRate, setInterestRate, "5%")
                    }
                  />
                </div>

                <div className="mb-4 col-md-6">
                  <label className="form-label">
                    Loan Term (Years) <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={loanTerm}
                    placeholder={placeholders.loanTerm}
                    onChange={(e) => handleNumericInput(e, setLoanTerm)}
                    onFocus={() => handleFocus("loanTerm")}
                    onBlur={() =>
                      handleBlur("loanTerm", loanTerm, setLoanTerm, "30")
                    }
                  />
                </div>

                <div className="mb-4 col-md-6">
                  <label className="form-label">Property Tax (Yearly)</label>
                  <input
                    type="text"
                    className="form-control"
                    value={propertyTax ? `$${propertyTax}` : ""}
                    placeholder={placeholders.propertyTax}
                    onChange={(e) => handleNumericInput(e, setPropertyTax)}
                    onFocus={() => handleFocus("propertyTax")}
                    onBlur={() =>
                      handleBlur("propertyTax", propertyTax, setPropertyTax, "$200")
                    }
                  />
                </div>

                <div className="mb-4 col-md-6">
                  <label className="form-label">Home Insurance (Yearly)</label>
                  <input
                    type="text"
                    className="form-control"
                    value={insurance ? `$${insurance}` : ""}
                    placeholder={placeholders.insurance}
                    onChange={(e) => handleNumericInput(e, setInsurance)}
                    onFocus={() => handleFocus("insurance")}
                    onBlur={() =>
                      handleBlur("insurance", insurance, setInsurance, "$250")
                    }
                  />
                </div>
              </div>

              <button
                className="btn btn-theme py-3 w-100"
                onClick={calculatePayment}
              >
                Calculate
              </button>
            </div>
          </div>

          <div className="col-lg-3 col-md-5 offset-lg-2">
            <Doughnut
              data={buildChartData()}
              options={{
                cutout: "65%",
                responsive: true,
                plugins: {
                  legend: { position: "bottom" },
                },
              }}
            />

            <h5 className="mt-4 mb-0 fw-bold text-center">
              {results
                ? `Monthly: $${parseFloat(results.total).toLocaleString()}`
                : "Fill the form to calculate"}
            </h5>
          </div>
        </div>

         <div className="mortgage_faqs faq_page mt-5">
            <h2 className="sec-title ">Frequently asked questions about mortgages</h2>

            <div className="accordion-style1">
              <div class="accordion" id="accordionExample">
                <div class="accordion-item">
                  <h2 class="accordion-header">
                    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    What is the principal of a loan?
                    </button>
                  </h2>
                  <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                    The principal of a loan is the remaining balance of the money you borrowed. Principal does not include interest, which is the cost of the loan.
                    </div>
                  </div>
                </div>
                <div class="accordion-item">
                  <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                      What is a down payment?
                    </button>
                  </h2>
                  <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                    The down payment is the money you pay upfront to purchase a home. The down payment plus the loan amount should add up to the cost of the home. Estimate your down payment amount with the help of our calculator.
                    </div>
                  </div>
                </div>
                <div class="accordion-item">
                  <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                    APR vs interest rate?
                    </button>
                  </h2>
                  <div id="collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                    Interest rate is the base fee for borrowing money, while the annual percentage rate (APR) is the interest rate plus the lender fees. APR gives you an accurate idea of the cost of a financing offer, highlighting the relationship between rate and fees.
                    </div>
                  </div>
                </div>
                <div class="accordion-item">
                  <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                    How much are closing costs?
                    </button>
                  </h2>
                  <div id="collapseFour" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                    Closing costs for a home buyer are typically 2% to 5% of the purchase price of the home. Depending on loan type, these costs may roll into the mortgage payment or be paid at closing. Agent commission is traditionally paid by the seller.
                    </div>
                  </div>
                </div>
                <div class="accordion-item">
                  <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                    How much is private mortgage insurance?
                    </button>
                  </h2>
                  <div id="collapseFive" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                    The cost of private mortgage insurance varies based on factors such as credit score, down payment and loan type.
                    </div>
                  </div>
                </div>
                <div class="accordion-item">
                  <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSix" aria-expanded="false" aria-controls="collapseSix">
                    How much is homeowner's insurance?
                    </button>
                  </h2>
                  <div id="collapseSix" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                    You should consult with your insurance carrier, but the general thought is that homeowner's insurance costs roughly $35 per month for every $100,000 of the home value.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
      </div>
      <Footer />
    </>
  );
}
