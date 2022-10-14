import React, { useState } from "react";
import "./App.css";
import { db } from "./firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
const App = () => {
  const [disableForm, setDisableForm] = useState(false);
  const [qrcode, setQrcode] = useState("");
  const [data, allData] = useState({
    email: "",
    name: "",
    gender: "",
    phone: "",
    eno: "",
    payment: "",
  });
  const submitFormHandler = async (e) => {
    e.preventDefault();

    if (
      data.email !== "" &&
      data.name !== "" &&
      data.phone !== "" &&
      data.eno !== "" &&
      data.gender !== "" &&
      data.payment !== ""
    ) {
      AddDataToServer();
    } else {
      alert("Fill All Details");
    }
  };
  const AddDataToServer = async () => {
    try {
      const docRef = await addDoc(collection(db, "registered_juniors"), {
        email: data.email,
        name: data.name,
        gender: data.gender,
        phone: data.phone,
        eno: data.eno,
        payment: data.payment,
        created: Timestamp.now(),
      });
      setDisableForm(true);
      setQrcode(
        `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${docRef.id}`
      );
    } catch (err) {
      alert(err);
    }
  };
  const inputHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    allData({ ...data, [name]: value });
  };
  return (
    <>
      <section className="mainContainer">
        <section className="navSection">
          <p className="title">IOT - Freshers Party Form 🎉</p>
        </section>
        <section className={disableForm ? "disable" : "mainFormArea"}>
          <form className="mainForm" onSubmit={submitFormHandler}>
            <div className="inputWrapper">
              <label htmlFor="fname">Full Name</label>
              <input
                onChange={inputHandler}
                type="text"
                id="fname"
                autoComplete="off"
                name="name"
                value={data.name}
              />
            </div>
            <div className="inputWrapper">
              <label htmlFor="email">Email Address</label>
              <input
                onChange={inputHandler}
                type="email"
                id="email"
                autoComplete="off"
                name="email"
                value={data.email}
              />
            </div>
            <div className="verticleWrap">
              <div className="inputWrapper">
                <label htmlFor="eno">Temporary Id</label>
                <input
                  onChange={inputHandler}
                  type="text"
                  id="eno"
                  autoComplete="off"
                  name="eno"
                  value={data.eno}
                />
              </div>
              <div className="inputWrapper">
                <label htmlFor="pno">Phone Number</label>
                <input
                  onChange={inputHandler}
                  type="number"
                  id="pno"
                  autoComplete="off"
                  name="phone"
                  value={data.phone}
                />
              </div>
            </div>
            <div className="verticleWrap">
              <div className="inputWrapper">
                <label htmlFor="gender">Gender</label>
                <select name="gender" id="gender" onChange={inputHandler}>
                  <option value="">-- Select --</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div className="inputWrapper">
                <label htmlFor="payment">Mode Of Payment</label>
                <select name="payment" id="payment" onChange={inputHandler}>
                  <option value="">-- Select --</option>
                  <option value="Online">Online</option>
                  <option value="Offline">Offline</option>
                </select>
              </div>
            </div>
            <input type="submit" className="submitForm" value="Submit Form" />
          </form>
        </section>
        <section className={disableForm ? "qrCodeDownload" : "disable"}>
          <img src={qrcode} alt="" width="200px" />
        </section>
      </section>
    </>
  );
};

export default App;
