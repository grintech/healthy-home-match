import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import LocationSearchInput from "../components/LocationSearchInput";

const BuildNewHouseForm = ({ show, onClose }) => {
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    location: "",
    manualLocation: "",
    landSize: "",
    ownLand: "no",
    houseType: "",
    storeys: "single",
    bedrooms: 1,
    bathrooms: 1,
    carSpaces: 1,
    energyFeatures: [],
    budget: "",
    startDate: "immediately",
    name: "",
    email: "",
    phone: "",
  });

  const stepTitles = {
    1: "Location & Property Details?",
    2: "House Type?",
    3: "Rooms & Living Needs?",
    4: "Healthy Home Features?",
    5: "Budget & Timeline?",
    6: "How can we reach you?",
  };

  // Reset function
  const resetForm = () => {
    setFormData({
      location: "",
      manualLocation: "",
      landSize: "",
      ownLand: "no",
      houseType: "",
      storeys: "single",
      bedrooms: 1,
      bathrooms: 1,
      carSpaces: 1,
      energyFeatures: [],
      budget: "",
      startDate: "",
      name: "",
      email: "",
      phone: "",
    });
    setLat("");
    setLong("");
    setStep(1);
    setErrors({});
  };

  // Reset on modal close
  useEffect(() => {
    if (!show) {
      resetForm();
    }
  }, [show]);

  const handleLocationSelect = (loc) => {
    if (loc?.lat && loc?.lng) {
      setLat(String(loc.lat));
      setLong(String(loc.lng));
      setFormData((prev) => ({
        ...prev,
        location:
          loc.label || loc.description || loc.formatted_address || "",
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => {
        const updated = checked
          ? [...prev.energyFeatures, value]
          : prev.energyFeatures.filter((v) => v !== value);
        return { ...prev, energyFeatures: updated };
      });
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validateStep = () => {
    let newErrors = {};

    if (step === 1) {
      const hasSelectedLocation = formData.location && lat && long;
      const hasManualLocation = formData.manualLocation?.trim() !== "";
      if (!hasSelectedLocation && !hasManualLocation) {
        newErrors.location =
          "Please select a location or enter it manually.";
      }
      if (!formData.landSize || Number(formData.landSize) <= 0) {
        newErrors.landSize = "Land size must be greater than 0.";
      }
    }

    if (step === 2) {
      if (!formData.houseType) {
        newErrors.houseType = "Please select a property type.";
      }
    }

    if (step === 3) {
      if (formData.bedrooms <= 0)
        newErrors.bedrooms = "Bedrooms must be at least 1.";
      if (formData.bathrooms <= 0)
        newErrors.bathrooms = "Bathrooms must be at least 1.";
      if (formData.carSpaces < 0)
        newErrors.carSpaces = "Car spaces cannot be negative.";
    }

    if (step === 5) {
      if (!formData.budget) newErrors.budget = "Please enter your budget.";
      if (!formData.startDate)
        newErrors.startDate = "Please select a start date.";
    }

    if (step === 6) {
      if (!formData.name) newErrors.name = "Name is required.";
      if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Valid email is required.";
      }
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
      const payload = { ...formData, lat, long };
      console.log("Form submitted", payload);

      resetForm();
      onClose();
    }
  };

  return (
    <Modal
      show={show}
      onHide={onClose}
      size="md"
      centered
      id="buildNewhouseModal"
    >
      <Modal.Header closeButton>
        <Modal.Title className="fw-bold">{stepTitles[step]}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Step 1 */}
        {step === 1 && (
          <>
            <div className="col-12 mb-3 location_div">
              <label>Preferred Location / Suburb</label>
              <LocationSearchInput onSelect={handleLocationSelect} />
              {errors.location && (
                <div className="text-danger">{errors.location}</div>
              )}
            </div>

            <div className="col-12 mb-3">
              <input
                type="text"
                name="manualLocation"
                className="form-control"
                placeholder="Enter street address (optional)"
                value={formData.manualLocation}
                onChange={handleChange}
              />
            </div>

            <div className="col-12 mb-3">
              <label>Land Size (sqm)</label>
              <input
                type="number"
                name="landSize"
                className="form-control"
                value={formData.landSize}
                onChange={handleChange}
              />
              {errors.landSize && (
                <div className="text-danger">{errors.landSize}</div>
              )}
            </div>
          </>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <>
            <div className="col-12 mb-3">
              <label>Do you own the land?</label>
              <select
                name="ownLand"
                className="form-select"
                value={formData.ownLand}
                onChange={handleChange}
              >
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>

            <div className="col-12 mb-3">
              <label>Property Type</label>
              <select
                name="houseType"
                className="form-select"
                value={formData.houseType}
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
              {errors.houseType && (
                <div className="text-danger">{errors.houseType}</div>
              )}
            </div>

            <div className="col-12 mb-3">
              <label>Storeys</label>
              <select
                name="storeys"
                className="form-select"
                value={formData.storeys}
                onChange={handleChange}
              >
                <option value="single">Single Storey</option>
                <option value="double">Double Storey</option>
              </select>
            </div>
          </>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <>
            <div className="col-12 mb-3">
              <label>Bedrooms</label>
              <input
                type="number"
                name="bedrooms"
                className="form-control"
                value={formData.bedrooms}
                onChange={handleChange}
              />
              {errors.bedrooms && (
                <div className="text-danger">{errors.bedrooms}</div>
              )}
            </div>

            <div className="col-12 mb-3">
              <label>Bathrooms</label>
              <input
                type="number"
                name="bathrooms"
                className="form-control"
                value={formData.bathrooms}
                onChange={handleChange}
              />
              {errors.bathrooms && (
                <div className="text-danger">{errors.bathrooms}</div>
              )}
            </div>

            <div className="col-12 mb-3">
              <label>Car Spaces</label>
              <input
                type="number"
                name="carSpaces"
                className="form-control"
                value={formData.carSpaces}
                onChange={handleChange}
              />
              {errors.carSpaces && (
                <div className="text-danger">{errors.carSpaces}</div>
              )}
            </div>
          </>
        )}

        {/* Step 4 */}
        {step === 4 && (
          <div className="col-12 mb-3">
            <div className="form-check">
              <input
                type="checkbox"
                id="solar"
                value="solar"
                className="form-check-input"
                checked={formData.energyFeatures.includes("solar")}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="solar">
                Solar Panels
              </label>
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                id="insulation"
                value="insulation"
                className="form-check-input"
                checked={formData.energyFeatures.includes("insulation")}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="insulation">
                Insulation
              </label>
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                id="waterTank"
                value="waterTank"
                className="form-check-input"
                checked={formData.energyFeatures.includes("waterTank")}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="waterTank">
                Rainwater Tank
              </label>
            </div>
          </div>
        )}

        {/* Step 5 */}
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
                placeholder="e.g. $500,000 - $700,000"
              />
              {errors.budget && (
                <div className="text-danger">{errors.budget}</div>
              )}
            </div>

            <div className="col-12 mb-3">
              <label>Preferred Start Date</label>
              <select
                name="startDate"
                className="form-select"
                value={formData.startDate}
                onChange={handleChange}
              >
                <option value="immediately">Immediately</option>
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

        {/* Step 6 */}
        {step === 6 && (
          <>
            <div className="col-12 mb-3">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <div className="text-danger">{errors.name}</div>}
            </div>

            <div className="col-12 mb-3">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <div className="text-danger">{errors.email}</div>
              )}
            </div>

            <div className="col-12 mb-3">
              <label>Phone number</label>
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
              {errors.phone && (
                <div className="text-danger">{errors.phone}</div>
              )}
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

export default BuildNewHouseForm;
