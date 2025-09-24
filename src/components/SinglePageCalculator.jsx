import React, { useEffect, useState, useRef } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { toast } from "react-toastify";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function SinglePageCalculator({ propertyPrice }) {
  const [homePrice, setHomePrice] = useState("");
  const [downPayment, setDownPayment] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [loanTerm, setLoanTerm] = useState("");
  const [propertyTax, setPropertyTax] = useState("");
  const [insurance, setInsurance] = useState("");
  const [results, setResults] = useState(null);
  const [showChart, setShowChart] = useState(false);

  const [downPaymentError, setDownPaymentError] = useState("");

  // refs for next input focus
  const downPaymentRef = useRef();
  const interestRef = useRef();
  const loanRef = useRef();
  const taxRef = useRef();
  const insuranceRef = useRef();

  const parseCurrency = (val) => val.replace(/\$|,/g, "");

  const handleNumericInput = (e, setter, fieldName) => {
  const rawValue = e.target.value.replace(/\$|,/g, "");
  if (/^\d*\.?\d*$/.test(rawValue)) {
    setter(rawValue);

    //  live validation for downPayment
    if (fieldName === "downPayment") {
      const home = parseFloat(parseCurrency(homePrice)) || 0;
      const down = parseFloat(rawValue) || 0;
      if (down > home) {
        setDownPaymentError("Down Payment cannot be greater than Home Price");
      } else {
        setDownPaymentError("");
      }
    }
  }
};

  const handleBlur = (value, setter, e, placeholder) => {
    if (value) {
      const num = parseFloat(value.toString().replace(/,/g, ""));
      if (!isNaN(num)) {
        setter(num.toLocaleString()); 
      }
    }
    if (e && !e.target.value) e.target.placeholder = placeholder; // restore placeholder
  };

  // handle Enter key → focus next input
  const handleKeyDown = (e, nextRef) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (nextRef?.current) nextRef.current.focus();
    }
  };

  useEffect(() => {
    if (propertyPrice && !homePrice) {
      const num = parseFloat(propertyPrice.toString().replace(/\$|,/g, ""));
      if (!isNaN(num)) {
        setHomePrice(num.toLocaleString());
      }
    }
  }, [propertyPrice, homePrice]);

  const calculatePayment = () => {
    if (!homePrice || !downPayment || !interestRate || !loanTerm) {
      toast.error("Please fill the form to calculate!");
      return;
    }

    if (parseFloat(parseCurrency(downPayment)) > parseFloat(parseCurrency(homePrice))) {
      // toast.error("Down Payment cannot be greater than Home Price!");
      return;
    }

    const principal =
      parseFloat(parseCurrency(homePrice)) -
      parseFloat(parseCurrency(downPayment));

    const monthlyRate = parseFloat(interestRate) / 100 / 12;
    const totalMonths = parseInt(loanTerm) * 12;

    const monthlyPI =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
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

    setShowChart(true);
  };

  // Chart Data
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
      labels.push("Property Taxes");
      data.push(parseFloat(results.tax));
      colors.push("#ffc107");
    }

    if (parseFloat(results.insurance) > 0) {
      labels.push("Insurance");
      data.push(parseFloat(results.insurance));
      colors.push("#479b20ff");
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

  return (
    <div className="mortgage_page ">
      <div className="border-0">
        <div className="row">
          {/* Home Price */}
          <div className="mb-4 col-md-6">
            <label className="form-label">Home Price <span className="text-danger">*</span></label>
            <input
              type="text"
              className="form-control"
              value={homePrice ? `$${homePrice}` : ""}
              placeholder="$150000"
              onChange={(e) => handleNumericInput(e, setHomePrice)}
              onBlur={(e) => handleBlur(homePrice, setHomePrice, e, "$150000")}
              onFocus={(e) => (e.target.placeholder = "")}
              onKeyDown={(e) => handleKeyDown(e, downPaymentRef)}
            />
          </div>

          {/* Down Payment */}
          <div className="mb-4 col-md-6">
          <label className="form-label">Down Payment <span className="text-danger">*</span></label>
          <input
            ref={downPaymentRef}
            type="text"
            className={`form-control ${downPaymentError ? "is-invalid" : ""}`}
            value={downPayment ? `$${downPayment}` : ""}
            placeholder="$20000"
            onChange={(e) => handleNumericInput(e, setDownPayment, "downPayment")}
            onBlur={(e) => handleBlur(downPayment, setDownPayment, e, "$20000")}
            onFocus={(e) => (e.target.placeholder = "")}
            onKeyDown={(e) => handleKeyDown(e, interestRef)}
          />
          {downPaymentError && (
            <small className="text-danger">{downPaymentError}</small>
          )}
        </div>


          {/* Interest Rate */}
          <div className="mb-4 col-md-6">
            <label className="form-label">Interest Rate (%) <span className="text-danger">*</span></label>
            <input
              ref={interestRef}
              type="text"
              className="form-control"
              value={interestRate}
              placeholder="5%"
              onChange={(e) => handleNumericInput(e, setInterestRate)}
              onFocus={(e) => (e.target.placeholder = "")}
              onBlur={(e) => handleBlur(interestRate, setInterestRate, e, "5%")}
              onKeyDown={(e) => handleKeyDown(e, loanRef)}
            />
          </div>

          {/* Loan Term */}
          <div className="mb-4 col-md-6">
            <label className="form-label">Loan Term (Years) <span className="text-danger">*</span></label>
            <input
              ref={loanRef}
              type="text"
              className="form-control"
              value={loanTerm}
              placeholder="30"
              onChange={(e) => handleNumericInput(e, setLoanTerm)}
              onFocus={(e) => (e.target.placeholder = "")}
              onBlur={(e) => handleBlur(loanTerm, setLoanTerm, e, "30")}
              onKeyDown={(e) => handleKeyDown(e, taxRef)}
            />
          </div>

          {/* Property Tax */}
          <div className="mb-4 col-md-6">
            <label className="form-label">Property Tax (Yearly)</label>
            <input
              ref={taxRef}
              type="text"
              className="form-control"
              value={propertyTax ? `$${propertyTax}` : ""}
              placeholder="$200"
              onChange={(e) => handleNumericInput(e, setPropertyTax)}
              onFocus={(e) => (e.target.placeholder = "")}
              onBlur={(e) => handleBlur(propertyTax, setPropertyTax, e, "$200")}
              onKeyDown={(e) => handleKeyDown(e, insuranceRef)}
            />
          </div>

          {/* Insurance */}
          <div className="mb-4 col-md-6">
            <label className="form-label">Home Insurance (Yearly)</label>
            <input
              ref={insuranceRef}
              type="text"
              className="form-control"
              value={insurance ? `$${insurance}` : ""}
              placeholder="$250"
              onChange={(e) => handleNumericInput(e, setInsurance)}
              onFocus={(e) => (e.target.placeholder = "")}
              onBlur={(e) => handleBlur(insurance, setInsurance, e, "$250")}
            />
          </div>
        </div>

        <button className="btn btn-theme fw-bold" onClick={calculatePayment}>
          Calculate
        </button>

        {showChart && (
          <div className="show_chart col-lg-6 col-md-8 mx-auto mt-4">
            <h5 className="mt-4 mb-3 fw-bold text-center">
              {results ? `Monthly: $${parseFloat(results.total).toLocaleString()}` : "Fill the form to calculate"}
            </h5>
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
          </div>
        )}
      </div>
    </div>
  );
}
