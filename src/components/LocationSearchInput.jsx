import React, { useState, useRef, useEffect } from "react";

const LocationSearchInput = ({ onSelect }) => {
  const [value, setValue] = useState("");
  const [predictions, setPredictions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const autocompleteServiceRef = useRef(null);
  const placesServiceRef = useRef(null);

  useEffect(() => {
    if (!window.google) return;

    autocompleteServiceRef.current =
      new window.google.maps.places.AutocompleteService();

    const map = new window.google.maps.Map(document.createElement("div"));
    placesServiceRef.current = new window.google.maps.places.PlacesService(map);
  }, []);

  const handleInput = (e) => {
  const inputValue = e.target.value;
  setValue(inputValue);

  if (!inputValue) {
    setPredictions([]);
    setShowDropdown(false);

    // reset location if cleared
    if (onSelect) onSelect(null);
    return;
  }

  if (autocompleteServiceRef.current) {
    autocompleteServiceRef.current.getPlacePredictions(
      { input: inputValue },
      (results) => {
        setPredictions(results || []);
        setShowDropdown(true);
      }
    );
  }
};


  const handleSelect = (prediction) => {
    setValue(prediction.description);
    setPredictions([]);
    setShowDropdown(false);

    if (placesServiceRef.current) {
      placesServiceRef.current.getDetails(
        { placeId: prediction.place_id, fields: ["geometry", "formatted_address"] },
        (place, status) => {
          if (
            status === window.google.maps.places.PlacesServiceStatus.OK &&
            place?.geometry?.location
          ) {
            const lat = place.geometry.location.lat();
            const lng = place.geometry.location.lng();
            onSelect({ description: place.formatted_address, lat, lng });
          }
        }
      );
    }
  };

  return (
    <div className="position-relative">
      <input
        value={value}
        onChange={handleInput}
        placeholder="Enter State, Province or Postcode"
        className="form-control w-100"
      />
      <i className="fa-solid fa-location-dot"></i>

      {showDropdown && predictions.length > 0 && (
        <ul
          className="list-group position-absolute w-100 shadow-sm"
          style={{ zIndex: 1000 }}
        >
          {predictions.map((prediction) => (
            <li
              key={prediction.place_id}
              className="list-group-item list-group-item-action"
              onClick={() => handleSelect(prediction)}
              style={{ cursor: "pointer" }}
            >
              <strong>{prediction.structured_formatting.main_text}</strong>{" "}
              <small>{prediction.structured_formatting.secondary_text}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LocationSearchInput;
