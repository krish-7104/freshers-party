import React from "react";
import "./Styles/App.css";
// import { db, storage } from "./firebase";
// import { collection, addDoc, Timestamp } from "firebase/firestore";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import base from "./Api/base";
// import { Dots } from "loading-animations-react";
// import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
const Senior = () => {
  // const [disableForm, setDisableForm] = useState(false);
  // const [file, setFile] = useState();
  // const [screenshot, setpaymentLink] = useState("");
  // const [uploading, setUploading] = useState(false);
  // const [uploadStatus, setUploadStatus] = useState("");
  // const [data, allData] = useState({
  //   email: "",
  //   name: "",
  //   gender: "",
  //   phone: "",
  //   enrollment: "",
  //   payment: "",
  //   file: "",
  // });
  // useEffect(() => {
  //   const uploadFile = () => {
  //     const storageRef = ref(storage, `Senior Payment/${data.name}`);
  //     const uploadTask = uploadBytesResumable(storageRef, file);
  //     uploadTask.on(
  //       "state_changed",
  //       (snapshot) => {
  //         const progress =
  //           (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //         progress !== "" && setUploadStatus(progress.toString().slice(0, 4));
  //       },
  //       (error) => {
  //         alert(error);
  //       },
  //       () => {
  //         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
  //           setpaymentLink(downloadURL);
  //         });
  //         setUploadStatus("");
  //       }
  //     );
  //   };
  //   file && uploadFile();
  // }, [data.name, file]);

  // const submitFormHandler = async (e) => {
  //   e.preventDefault();
  //   if (
  //     data.email !== "" &&
  //     data.name !== "" &&
  //     data.phone !== "" &&
  //     data.enrollment !== "" &&
  //     data.gender !== "" &&
  //     data.payment !== ""
  //   ) {
  //     setUploading(true);
  //     AddDataToServer();
  //   } else {
  //     toast.warn("Fill All Details!", {
  //       position: "bottom-right",
  //       autoClose: 4000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "dark",
  //     });
  //   }
  // };
  // const AddDataToServer = async () => {
  //   try {
  //     await addDoc(collection(db, "registered_seniors"), {
  //       email: data.email,
  //       name: data.name,
  //       gender: data.gender,
  //       phone: "+91" + data.phone,
  //       enrollment: data.enrollment,
  //       payment: data.payment,
  //       screenshot,
  //       created: Timestamp.now(),
  //     });
  //   } catch (err) {}
  //   let { name, email, gender, enrollment, payment } = data;
  //   let phone = "+91" + data.phone;
  //   base("seniors").create(
  //     {
  //       name,
  //       email,
  //       phone,
  //       gender,
  //       enrollment,
  //       payment,
  //       screenshot,
  //     },
  //     function (err, record) {
  //       if (err) {
  //         toast.error("Something Went Wrong", {
  //           position: "bottom-right",
  //           autoClose: 4000,
  //           hideProgressBar: false,
  //           closeOnClick: true,
  //           pauseOnHover: true,
  //           draggable: true,
  //           progress: undefined,
  //           theme: "dark",
  //         });
  //       } else {
  //         setDisableForm(true);
  //         setUploading(false);
  //         toast.success("Registered Successfully", {
  //           position: "bottom-right",
  //           autoClose: 4000,
  //           hideProgressBar: false,
  //           closeOnClick: true,
  //           pauseOnHover: true,
  //           draggable: true,
  //           progress: undefined,
  //           theme: "dark",
  //         });
  //       }
  //     }
  //   );
  // };
  // const inputHandler = (e) => {
  //   const name = e.target.name;
  //   const value = e.target.value;
  //   allData({ ...data, [name]: value });
  // };
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
          <p className="title">Reverie'22 Form ????</p>
          <p className="subTitle">IOT Senior</p>
        </section>
        <section className="formClosed">FORM CLOSED!</section>
        {/* <section className={disableForm ? "disable" : "mainFormArea"}>
          <form className="mainForm">
            <div className="inputWrapper">
              <label htmlFor="fname">Full Name</label>
              <input
                onChange={inputHandler}
                type="text"
                id="fname"
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
              <div className="uploadScreenshotArea">
                <p className="qrCodetext">
                  <b>Note: </b>Upload the Screenshot of the payment done page
                  here. If you face any problem then contact us.
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
          <p className="afterFormTitle">Lets Go Yeah ????</p>
          <p className="afterFormSub">You Are Successfully Registered</p>
          <p className="afterFromDesc">
            Now Get Ready For Making Some Unforgettable And Mesmerizing Moments.
            Freshers 2022 By CSE-IOT
          </p>
        </section>
        <ToastContainer /> */}
      </section>
    </>
  );
};

export default Senior;
