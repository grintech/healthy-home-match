import React, { useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { toast } from "react-toastify";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function SinglePageCalculator() {
  const [homePrice, setHomePrice] = useState("");
  const [downPayment, setDownPayment] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [loanTerm, setLoanTerm] = useState("");
  const [propertyTax, setPropertyTax] = useState("");
  const [insurance, setInsurance] = useState("");
  const [results, setResults] = useState(null);

  const [showChart, setShowChart] = useState(false);


  const parseCurrency = (val) => val.replace(/\$|,/g, "");

  const handleNumericInput = (e, setter) => {
    const rawValue = e.target.value.replace(/\$|,/g, "");
    if (/^\d*\.?\d*$/.test(rawValue)) {
      setter(rawValue);
    }
  };

  const handleBlur = (value, setter) => {
    if (value) {
      const num = parseFloat(value);
      setter(num.toLocaleString());
    }
  };

  const calculatePayment = () => {
    if (!homePrice || !downPayment || !interestRate || !loanTerm) {
      toast.error( "Please fill the form to calculate !");
      return;
    }

    const principal =
      parseFloat(parseCurrency(homePrice)) - parseFloat(parseCurrency(downPayment));

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

  return (
    <div className="mortgage_page ">
      <div className="card overview_card border-0 ">
        <h4 className="mb-3 single_head">Mortgage Calculator</h4>

        <div className="show_breakdown mt-3">
          {results && (
            <>
             <div className="row flex-wrap">
                <div className="col">
                    <p className="mb-1 text-muted">P&I</p>
                    <h6 className="fw-bold text-primary">
                    ${parseFloat(results.pi).toLocaleString()}
                    </h6>
                </div>
                <div className="col">
                    <p className="mb-1 text-muted">Taxes</p>
                    <h6 className="fw-bold text-warning">
                    ${parseFloat(results.tax).toLocaleString()}
                    </h6>
                </div>
                <div className="col">
                    <p className="mb-1 text-muted">Insurance</p>
                    <h6 className="fw-bold text-info">
                    ${parseFloat(results.insurance).toLocaleString()}
                    </h6>
                </div>
             </div>
             <hr />
            </>
          )}
        </div>
       
        <div className="row">
          <div className="mb-4 col-md-6">
            <label className="form-label">
              Home Price <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              value={homePrice ? `$${homePrice}` : ""}
              placeholder="$150000"
              onChange={(e) => handleNumericInput(e, setHomePrice)}
              onBlur={() => handleBlur(homePrice, setHomePrice)}
            />
          </div>

          <div className="mb-4 col-md-6">
            <label className="form-label">
              Down Payment <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              value={downPayment ? `$${downPayment}` : ""}
              placeholder="$20000"
              onChange={(e) => handleNumericInput(e, setDownPayment)}
              onBlur={() => handleBlur(downPayment, setDownPayment)}
            />
          </div>

          <div className="mb-4 col-md-6">
            <label className="form-label">
              Interest Rate (%) <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              value={interestRate}
              placeholder="5%"
              onChange={(e) => handleNumericInput(e, setInterestRate)}
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
              placeholder="30"
              onChange={(e) => handleNumericInput(e, setLoanTerm)}
            />
          </div>

          <div className="mb-4 col-md-6">
            <label className="form-label">Property Tax (Yearly)</label>
            <input
              type="text"
              className="form-control"
              value={propertyTax ? `$${propertyTax}` : ""}
              placeholder="$200"
              onChange={(e) => handleNumericInput(e, setPropertyTax)}
              onBlur={() => handleBlur(propertyTax, setPropertyTax)}
            />
          </div>

          <div className="mb-4 col-md-6">
            <label className="form-label">Home Insurance (Yearly)</label>
            <input
              type="text"
              className="form-control"
              value={insurance ? `$${insurance}` : ""}
              placeholder="$250"
              onChange={(e) => handleNumericInput(e, setInsurance)}
              onBlur={() => handleBlur(insurance, setInsurance)}
            />
          </div>
        </div>

        <button className="btn btn-theme fw-bold py-3" onClick={calculatePayment} >
          Calculate
        </button>

        {/* Chart Section */}
        {showChart && (
            <div className="show_chart col-lg-6 col-md-8 mx-auto mt-4">
                <h5 className="mt-4 mb-3 fw-bold text-center">
                {results
                ? `Monthly: $${parseFloat(results.total).toLocaleString()}`
                : "Fill the form to calculate"}
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
