import React, { useState, useEffect } from "react";
import { db, storage } from "./firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import base from "./Api/base";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Dots } from "loading-animations-react";
const Junior = () => {
  const [disableForm, setDisableForm] = useState(false);
  const [file, setFile] = useState();
  const [screenshot, setpaymentLink] = useState("");
  const [uploadStatus, setUploadStatus] = useState("");
  const [uploading, setUploading] = useState(false);
  const [data, allData] = useState({
    email: "",
    name: "",
    gender: "",
    phone: "",
    tempId: "",
    payment: "",
    file: "",
    transport: "",
  });
  useEffect(() => {
    const uploadFile = () => {
      const storageRef = ref(storage, `Junior Payment/${data.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          progress !== "" && setUploadStatus(progress.toString().slice(0, 4));
        },
        (error) => {
          alert(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setpaymentLink(downloadURL);
          });
          setUploadStatus("");
        }
      );
    };
    file && uploadFile();
  }, [data.name, file]);

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
      setUploading(true);
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
        phone: "+91" + data.phone,
        tempId: data.tempId,
        payment: data.payment,
        qrcode: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${
          data.phone.slice(0, 2) +
          "i" +
          data.phone.slice(4, 6) +
          "o" +
          data.phone.slice(6, 8) +
          "t"
        }`,
        screenshot,
        transport: data.transport,
        created: Timestamp.now(),
      });
    } catch (err) {}
    let { name, email, gender, tempId, payment, transport } = data;
    let phone = "+91" + data.phone;
    let qr = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${
      phone.slice(0, 2) +
      "i" +
      phone.slice(4, 6) +
      "o" +
      phone.slice(6, 8) +
      "t"
    }`;
    base("juniors").create(
      {
        name,
        email,
        phone,
        gender,
        tempId,
        payment,
        transport,
        qr,
        screenshot,
      },
      function (err, record) {
        if (err) {
          toast.error("Something Went Wrong", {
            position: "bottom-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        } else {
          setUploading(false);
          setDisableForm(true);
          toast.success("Registered Successfully", {
            position: "bottom-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
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
          <p className="title">Reverie'22 Form 🎉</p>
          <p className="subTitle">IOT Junior</p>
        </section>
        <section className={disableForm ? "disable" : "mainFormArea"}>
          <form className="mainForm">
            <div className="verticleWrap">
              <div className="inputWrapper">
                <label htmlFor="fname">Full Name</label>
                <input
                  onChange={inputHandler}
                  type="text"
                  id="fname"
                  name="name"
                  value={data.name}
                  autoComplete="off"
                />
              </div>
              <div className="inputWrapper">
                <label htmlFor="tempId">Temporary Id</label>
                <input
                  onChange={inputHandler}
                  type="text"
                  id="tempId"
                  name="tempId"
                  value={data.tempId}
                  autoComplete="off"
                />
              </div>
            </div>
            <div className="inputWrapper">
              <label htmlFor="email">Email Address</label>
              <input
                onChange={inputHandler}
                type="email"
                id="email"
                name="email"
                value={data.email}
                autoComplete="off"
              />
            </div>
            <div className="verticleWrap">
              <div className="inputWrapper">
                <label htmlFor="pno">Phone Number</label>
                <input
                  onChange={inputHandler}
                  type="number"
                  id="pno"
                  name="phone"
                  value={data.phone}
                  autoComplete="off"
                />
              </div>
              <div className="inputWrapper">
                <label htmlFor="gender">Gender</label>
                <select name="gender" id="gender" onChange={inputHandler}>
                  <option value="">-- Select --</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </div>
            <div className="verticleWrap">
              <div className="inputWrapper">
                <label htmlFor="transport">Need Transport?</label>
                <select name="transport" id="transport" onChange={inputHandler}>
                  <option value="">-- Select --</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
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
                src="https://firebasestorage.googleapis.com/v0/b/freshers-krish.appspot.com/o/Qr%20Code%2Fjunior.jpg?alt=media&token=ca90e67c-e40e-481d-917f-c30c99e2577a"
                alt=""
              />
              <div className="uploadScreenshotArea">
                <p className="qrCodetext">
                  <b>Note: </b>After paying online, don't forget to take a
                  screenshot of the payment success page and upload it if you
                  face any problems contact on below given.
                </p>
                {screenshot !== "" ? (
                  <label className="uploadFIle success" disable>
                    Screenshot Uploaded
                  </label>
                ) : uploadStatus === "" ? (
                  <label htmlFor="uploadFile" className="uploadFIle">
                    Upload Screenshot
                  </label>
                ) : (
                  <label htmlFor="uploadFile" className="uploadFIle">
                    Uploading Wait {uploadStatus}%
                  </label>
                )}
                <input
                  type="file"
                  id="uploadFile"
                  className="disable"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>
            </div>
            {!uploading ? (
              <input
                type="submit"
                className="submitForm"
                value="Submit Form"
                onClick={submitFormHandler}
              />
            ) : (
              <div className="loadingAni">
                <Dots
                  className="uploadData"
                  dotColors={["red", "black", "blue", "orange", "red"]}
                  text="Uploading Data"
                />
              </div>
            )}
            <div className="contactDetails">
              <p>
                For Form Realted Issue Contact{" "}
                <a href="https://wa.me/+918160704091">Krish Jotaniya</a>
              </p>
            </div>
          </form>
        </section>
        <section
          className={disableForm ? "afterFormSubmitContainer" : "disable"}
        >
          <p className="afterFormTitle">Lets Go Yeah 🎉</p>
          <p className="afterFormSub">You Are Successfully Registered</p>
          <p className="afterFromDesc">
            Now Get Ready For Making Some Unforgettable And Mesmerizing Moments.
            Freshers 2022 By CSE-IOT
          </p>
        </section>

        <ToastContainer />
      </section>
    </>
  );
};

export default Junior;
