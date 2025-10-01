import React, { useState, useEffect } from "react";
import { Modal, ProgressBar } from "react-bootstrap";
import LocationSearchInput from "../components/LocationSearchInput";

const RetrofitHouseForm = ({ show, onClose }) => {
  const [step, setStep] = useState(1);
   const totalSteps = 6; // for progress
  const [formData, setFormData] = useState({
    location: "",
    latitude: "",
    longitude: "",
    propertyAge: "",
    propertyType: "",
    structuralUpgrades: [],
    energyUpgrades: [],
    comfortUpgrades: [],
    budget: "",
    startDate: "immediately",
    name: "",
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});


 const calculateProgress = () => {
  let completedSteps = 0;

  // Step 1
  if (formData.location && formData.propertyAge && formData.propertyType) completedSteps++;

  // Step 2
  if (step > 1) completedSteps++; // Consider step visited as complete

  // Step 3
  if (step > 2) completedSteps++;

  // Step 4
  if (step > 3) completedSteps++;

  // Step 5
  if (step > 4 && formData.budget && formData.startDate) completedSteps++;

  // Step 6
  if (step > 5 && formData.name && formData.email && formData.phone) completedSteps++;

  return Math.round((completedSteps / totalSteps) * 100);
};

const progress = calculateProgress();



  const stepTitles = {
    1: "Property Details",
    2: "Structural & Safety Upgrades",
    3: "Energy Efficiency Upgrades",
    4: "Comfort & Living Upgrades",
    5: "Budget & Timeline",
    6: "How can we reach you?",
  };

  useEffect(() => {
    if (show) {
      setStep(1);
      setFormData({
        location: "",
        latitude: "",
        longitude: "",
        propertyAge: "",
        propertyType: "",
        structuralUpgrades: [],
        energyUpgrades: [],
        comfortUpgrades: [],
        budget: "",
        startDate: "",
        name: "",
        email: "",
        phone: "",
      });
      setErrors({});
    }
  }, [show]);


  const handleLocationSelect = (loc) => {
  if (loc && loc.lat != null && loc.lng != null) {
    setFormData((prev) => ({
      ...prev,
      location: loc.description || "", 
      latitude: String(loc.lat),
      longitude: String(loc.lng),
    }));
    setErrors((prev) => ({ ...prev, location: "" }));
  }
};


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => {
        const updated = checked
          ? [...prev[name], value]
          : prev[name].filter((v) => v !== value);
        return { ...prev, [name]: updated };
      });
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateStep = () => {
    const newErrors = {};
    if (step === 1) {
      if (!formData.location) newErrors.location = "Location is required";
      if (!formData.propertyAge) {
            newErrors.propertyAge = "Property age is required";
      } else if (!/^\d{4}$/.test(formData.propertyAge)) {
        newErrors.propertyAge = "Enter a valid 4-digit year";
      } else if (formData.propertyAge === "0000") {
        newErrors.propertyAge = "Year cannot be 0000";
      } else if (Number(formData.propertyAge) > new Date().getFullYear()) {
        newErrors.propertyAge = "Year cannot be in the future";
      }
      if (!formData.propertyType) newErrors.propertyType = "Property type is required";
    }
    if (step === 5) {
      if (!formData.budget) newErrors.budget = "Budget is required";
      if (!formData.startDate) newErrors.startDate = "Preferred start date is required";
    }
    if (step === 6) {
      if (!formData.name) newErrors.name = "Name is required";
      if (!formData.email) newErrors.email = "Email is required";
      if (!formData.phone) {
        newErrors.phone = "Phone number is required.";
      } else if (!/^(\+61|0)[0-9]{9}$/.test(formData.phone)) {
        newErrors.phone = "Enter a valid Australian phone number.";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep(step + 1);
    }
  };

  const handleSubmit = () => {
    if (validateStep()) {
      console.log("Retrofit Form Submitted", formData);
      onClose();
    }
  };

  return (
    <Modal id="retrofyHouseModal" show={show} onHide={onClose} size="md" centered >
      <Modal.Header closeButton>
        <Modal.Title className="fw-bold">{stepTitles[step]}</Modal.Title>
      </Modal.Header>

        {/* Progress Bar */}
        {/* <div className="px-3 my-3">
            <ProgressBar now={progress} label={`${progress}%`} />
        </div> */}

      <Modal.Body>
        {/* STEP 1 – Property */}
        {step === 1 && (
          <>
            <div className="col-12 mb-3 location_div">
              <label>Property Location</label>
              <LocationSearchInput onSelect={handleLocationSelect} />
              {errors.location && <small className="text-danger">{errors.location}</small>}
            </div>

            <div className="col-12 mb-3">
              <label>Property Built Year</label>
              <input
                type="number"
                name="propertyAge"
                className="form-control"
                value={formData.propertyAge}
                onChange={handleChange}
                placeholder="e.g. 1990"
              />
              {errors.propertyAge && <small className="text-danger">{errors.propertyAge}</small>}
            </div>

            <div className="col-12 mb-3">
              <label>Property Type</label>
              <select
                name="propertyType"
                className="form-select"
                value={formData.propertyType}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="detached">House</option>
                <option value="duplex">Duplex</option>
                <option value="townhouse">Townhouse</option>
                <option value="apartment">Apartment</option>
                <option value="villa">Villa</option>
                <option value="acreage">Acreage</option>
                <option value="other">Other</option>
              </select>
              {errors.propertyType && <small className="text-danger">{errors.propertyType}</small>}
            </div>
          </>
        )}

        {/* STEP 2 – Structural */}
        {step === 2 && (
          <div className="col-12 mb-3">
            <div className="form-check">
              <input
                type="checkbox"
                id="foundation"
                value="foundation"
                name="structuralUpgrades"
                className="form-check-input"
                checked={formData.structuralUpgrades.includes("foundation")}
                onChange={handleChange}
              />
              <label htmlFor="foundation" className="form-check-label">
                Foundation / Crack Repairs
              </label>
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                id="roof"
                value="roof"
                name="structuralUpgrades"
                className="form-check-input"
                checked={formData.structuralUpgrades.includes("roof")}
                onChange={handleChange}
              />
              <label htmlFor="roof" className="form-check-label">
                Roof Repairs / Strengthening
              </label>
            </div>
          </div>
        )}

        {/* STEP 3 – Energy */}
        {step === 3 && (
          <div className="col-12 mb-3">
            <div className="form-check">
              <input
                type="checkbox"
                id="insulation"
                value="insulation"
                name="energyUpgrades"
                className="form-check-input"
                checked={formData.energyUpgrades.includes("insulation")}
                onChange={handleChange}
              />
              <label htmlFor="insulation" className="form-check-label">
                Wall / Roof Insulation
              </label>
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                id="solar"
                value="solar"
                name="energyUpgrades"
                className="form-check-input"
                checked={formData.energyUpgrades.includes("solar")}
                onChange={handleChange}
              />
              <label htmlFor="solar" className="form-check-label">
                Solar Panels
              </label>
            </div>
          </div>
        )}

        {/* STEP 4 – Comfort */}
        {step === 4 && (
          <div className="col-12 mb-3">
            <div className="form-check">
              <input
                type="checkbox"
                id="ventilation"
                value="ventilation"
                name="comfortUpgrades"
                className="form-check-input"
                checked={formData.comfortUpgrades.includes("ventilation")}
                onChange={handleChange}
              />
              <label htmlFor="ventilation" className="form-check-label">
                Ventilation / Airflow
              </label>
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                id="waterTank"
                value="waterTank"
                name="comfortUpgrades"
                className="form-check-input"
                checked={formData.comfortUpgrades.includes("waterTank")}
                onChange={handleChange}
              />
              <label htmlFor="waterTank" className="form-check-label">
                Rainwater Tank
              </label>
            </div>
          </div>
        )}

        {/* STEP 5 – Budget */}
        {step === 5 && (
          <>
            <div className="col-12 mb-3">
              <label>Budget (AUD)</label>
              <input
                type="text"
                name="budget"
                className="form-control"
                value={formData.budget}
                onChange={handleChange}
                placeholder="e.g. $50,000 - $100,000"
              />
              {errors.budget && <small className="text-danger">{errors.budget}</small>}
            </div>

            <div className="col-12 mb-3">
              <label>Preferred Start Date</label>
              <select
                name="startDate"
                className="form-select"
                value={formData.startDate}
                onChange={handleChange}
              >
                <option value="immediately" >Immediately</option>
                <option value="one-month">Within one month</option>
                <option value="three-months">Within next three months</option>
                <option value="six-months">Within next six months</option>
                <option value="twelve-months">
                  Within next twelve months
                </option>
                <option value="notSure">Not sure</option>
              </select>
              {errors.startDate && (
                <div className="text-danger">{errors.startDate}</div>
              )}
            </div>
          </>
        )}

        {/* STEP 6 – Contact */}
        {step === 6 && (
          <>
            <div className="col-12 mb-3">
              <label>Your Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <small className="text-danger">{errors.name}</small>}
            </div>

            <div className="col-12 mb-3">
              <label>Your Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <small className="text-danger">{errors.email}</small>}
            </div>

            <div className="col-12 mb-3">
              <label>Your Phone</label>
              <input
                type="text"
                name="phone"
                className="form-control"
                value={formData.phone}
                 onChange={(e) => {
                  const val = e.target.value.replace(/[^\d+]/g, "").slice(0, 12);
                  setFormData((prev) => ({ ...prev, phone: val }));
                }}
              />
              {errors.phone && <small className="text-danger">{errors.phone}</small>}
            </div>
          </>
        )}
      </Modal.Body>

      <Modal.Footer>
        {step > 1 && (
          <button className="btn btn-dark" onClick={() => setStep(step - 1)}>
            Back
          </button>
        )}
        {step < 6 && (
          <button className="btn btn-theme" onClick={handleNext}>
            Next
          </button>
        )}
        {step === 6 && (
          <button className="btn btn-theme" onClick={handleSubmit}>
            Submit
          </button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default RetrofitHouseForm;
