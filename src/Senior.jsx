import React, { useState } from "react";
import { db } from "./firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import base from "./Api/base";
const Senior = () => {
  const [disableForm, setDisableForm] = useState(false);
  const [data, allData] = useState({
    email: "",
    name: "",
    gender: "",
    phone: "",
    enrollment: "",
    payment: "",
  });
  const submitFormHandler = async (e) => {
    e.preventDefault();

    if (
      data.email !== "" &&
      data.name !== "" &&
      data.phone !== "" &&
      data.enrollment !== "" &&
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
      await addDoc(collection(db, "registered_seniors"), {
        email: data.email,
        name: data.name,
        gender: data.gender,
        phone: data.phone,
        enrollment: data.enrollment,
        payment: data.payment,
        qrcode: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${
          data.enrollment * 2 + 9
        }`,
        created: Timestamp.now(),
      });
    } catch (err) {
      alert(err);
    }
    let { name, email, phone, gender, enrollment, payment } = data;
    let qr = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${
      enrollment * 2 + 9
    }`;
    base("seniors").create(
      {
        name,
        email,
        phone,
        gender,
        enrollment,
        payment,
        qr,
      },
      function (err, record) {
        if (err) {
          alert(err);
        } else {
          alert(record.getId());
        }
      }
    );
  };
  const inputHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    allData({ ...data, [name]: value });
  };
  return (
    <>
      <section className="mainContainer">
        <div className="page-bg"></div>
        <div className="animation-wrapper">
          <div className="particle particle-1"></div>
          <div className="particle particle-2"></div>
          <div className="particle particle-3"></div>
          <div className="particle particle-4"></div>
        </div>
        <section className="navSection">
          <p className="title">Freshers Party Form 🎉</p>
          <p className="subTitle">IOT Senior</p>
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
                <label htmlFor="enrollment">Enrollment No</label>
                <input
                  onChange={inputHandler}
                  type="text"
                  id="enrollment"
                  autoComplete="off"
                  name="enrollment"
                  value={data.enrollment}
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
            <div
              className={data.payment === "Online" ? "paymentSec" : "disable"}
            >
              <img
                src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=1233"
                alt=""
              />
              <div className="uploadScreenshotArea">
                <p className="qrCodetext">
                  <b>Note: </b>After Paying Online, Don't Forget Take A
                  Screenshot Of Payment Success Page And Upload It. If You Face
                  Any Problem Contact On Below Given Phone Numbers.
                </p>
                <label htmlFor="uploadFile" className="uploadFIle">
                  Upload Screenshot
                </label>
                <input
                  type="file"
                  id="uploadFile"
                  className="disable"
                  onChange={inputHandler}
                  value={data.file}
                />
              </div>
            </div>
            <input type="submit" className="submitForm" value="Submit Form" />
          </form>
        </section>
        <section
          className={disableForm ? "afterFormSubmitContainer" : "disable"}
        >
          <p className="afterFormTitle">Lets Go Yeah 🎉</p>
          <p className="afterFormSub">You Are Successfully Registered</p>
          <p className="afterFromDesc">
            You will get the Invitation Card From Our Team With Unique Qr Code
            On Your Respective Email Address Asap.
          </p>
        </section>
        <ToastContainer />
      </section>
    </>
  );
};

export default Senior;
