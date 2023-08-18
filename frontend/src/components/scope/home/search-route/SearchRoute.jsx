import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./SearchRoute.css";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

const SearchRoute = () => {
  const [selectedDepartureAddress, setSelectedDepartureAddress] = useState("");
  const [selectedArrivalAddress, setSelectedArrivalAddress] = useState("");
  const [selectedDepartureDate, setSelectedDepartureDate] = useState(null);
  const [selectedNumberSeats, setSelectedNumberSeats] = useState("");
  const navigate = useNavigate();

  function debounce(fn, delay) {
    let timeoutID;
    return function (...args) {
      if (timeoutID) {
        clearTimeout(timeoutID);
      }
      timeoutID = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  }

  // Fonctions debounce pour la mise à jour des adresses
  const debouncedSetSelectedDepartureAddress = debounce((value) => {
    setSelectedDepartureAddress(value);
  }, 300);

  const debouncedSetSelectedArrivalAddress = debounce((value) => {
    setSelectedArrivalAddress(value);
  }, 300);

  const handleSearchClick = () => {
    const queryParams = new URLSearchParams();
    queryParams.append("departureAddress", selectedDepartureAddress);
    queryParams.append("arrivalAddress", selectedArrivalAddress);
    queryParams.append(
      "departureDate",
      dayjs(selectedDepartureDate).format("YYYY-MM-DD"),
    );
    queryParams.append("numberOfSeats", selectedNumberSeats);

    navigate(`/route-results?${queryParams.toString()}`);
  };

  return (
    <div className="container h-100">
      <div className=" d-flex justify-content-center align-items-center h-100 mt-3">
        <input
          type="text"
          className="form-control w-50"
          value={selectedDepartureAddress}
          onChange={(event) => setSelectedDepartureAddress(event.target.value)}
          placeholder="Departure address"
        />
        <input
          type="text"
          className="form-control w-50"
          value={selectedArrivalAddress}
          onChange={(event) => setSelectedArrivalAddress(event.target.value)}
          placeholder="Arrival address"
        />

        <DatePicker
          showPopperArrow
          calendarClassName="react-datepicker__calendar-icon"
          dateFormat="dd/MM/yyyy"
          placeholderText="DD/MM/YYYY"
          selected={selectedDepartureDate}
          onChange={(date) => {
            setSelectedDepartureDate(date);
            console.log({ selectedDepartureDate });
          }}
        />
        <input
          type="number"
          className="form-control w-25"
          value={selectedNumberSeats}
          onChange={(event) => setSelectedNumberSeats(event.target.value)}
          placeholder="number of passengers"
        />

        <button className="btn btn-success" onClick={handleSearchClick}>
          Search
        </button>
      </div>
    </div>
  );

  //   <div>
  //     <div className="d-flex flex-row align-items-center mb-4">
  //       <GooglePlacesAutocomplete
  //         onSelect={({ description }) =>
  //           debouncedSetSelectedDepartureAddress(description)
  //         }
  //         placeholder="Departure Address"
  //       />
  //     </div>
  //
  //     <div className="d-flex flex-row align-items-center mb-4">
  //       <GooglePlacesAutocomplete
  //         onSelect={({ description }) =>
  //           debouncedSetSelectedArrivalAddress(description)
  //         }
  //         placeholder="Arrival Address"
  //       />
  //     </div>
  //
  //     <div className="d-flex flex-row align-items-center mb-4">
  //       <div className="form-outline flex-fill mb-0">
  //         <label className="form-label" htmlFor="birthdate"></label>
  //         <DatePicker
  //           id="selectedDepartureDate"
  //           showIcon
  //           className="form-control"
  //           calendarClassName="custom-calendar"
  //           clearIcon={null}
  //           format="dd/MM/yyyy"
  //           minDate={new Date()}
  //           placeholder="DD/MM/YYYY"
  //           value={selectedDepartureDate}
  //           onChange={(date) => setSelectedDepartureDate(date)}
  //         />
  //       </div>
  //     </div>
  //
  //     <div className="d-flex flex-row align-items-center mb-4">
  //       <div className="form-outline flex-fill mb-0">
  //         <label className="form-label" htmlFor="form3Example3c"></label>
  //         <input
  //           type="number"
  //           id="numberSeat"
  //           className={`form-control`}
  //           placeholder="Number of passenger"
  //           value={selectedNumberSeats}
  //           onChange={(event) => setSelectedNumberSeats(event.target.value)}
  //         />
  //       </div>
  //     </div>
  //
  //     <button>Rechercher</button>
  //   </div>
  // );
};

export default SearchRoute;
