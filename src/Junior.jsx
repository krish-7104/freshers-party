import React, { useState } from "react";
import { db } from "./firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import base from "./Api/base";
const Junior = () => {
  const [disableForm, setDisableForm] = useState(false);
  const [data, allData] = useState({
    email: "",
    name: "",
    gender: "",
    phone: "",
    tempId: "",
    payment: "",
    file: "",
  });
  const submitFormHandler = async (e) => {
    e.preventDefault();

    if (
      data.email !== "" &&
      data.name !== "" &&
      data.phone !== "" &&
      data.tempId !== "" &&
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
      await addDoc(collection(db, "registered_juniors"), {
        email: data.email,
        name: data.name,
        gender: data.gender,
        phone: data.phone,
        tempId: data.tempId,
        payment: data.payment,
        qrcode: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${
          data.phone * 2 + 9
        }`,
        created: Timestamp.now(),
      });
    } catch (err) {
      console.log(err);
    }
    let { name, email, phone, gender, tempId, payment } = data;
    let qr = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${
      phone * 2 + 9
    }`;
    base("juniors").create(
      {
        name,
        email,
        phone,
        gender,
        tempId,
        payment,
        qr,
      },
      function (err, record) {
        if (err) {
          console.log(err);
        } else {
          console.log(record.getId());
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
          <p className="subTitle">IOT Junior</p>
        </section>
        <section className={disableForm ? "disable" : "mainFormArea"}>
          <form className="mainForm">
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
                <label htmlFor="tempId">Temporary Id</label>
                <input
                  onChange={inputHandler}
                  type="text"
                  id="tempId"
                  autoComplete="off"
                  name="tempId"
                  value={data.tempId}
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
            <input
              type="submit"
              className="submitForm"
              value="Submit Form"
              onClick={submitFormHandler}
            />
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

export default Junior;
