import React, { useState } from "react";
import "./Styles/Admin.css";
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
const Admin = () => {
  const [pass, setPass] = useState();
  const [data, setData] = useState([]);
  const [typeData, setType] = useState("registered_juniors");
  const callDataHandler = async () => {
    setData([]);
    if (pass === "Abe Saale") {
      const querySnapshot = await getDocs(collection(db, typeData));
      querySnapshot.forEach((doc) => {
        setData((prev) => [...prev, doc.data()]);
      });
    } else {
      alert("Bete Password Wrong Hai!");
    }
  };
  const setStudentType = (e) => {
    setData([]);
    setType(e.target.value);
  };
  return (
    <div className="mainAdmin">
      <div className="checkPass">
        <input
          type="password"
          className="password"
          value={pass}
          placeholder="Enter Password"
          onChange={(e) => setPass(e.target.value)}
        />
        <select name="typeOfData" id="typeOfData" onChange={setStudentType}>
          <option value="registered_juniors">Junior</option>
          <option value="registered_seniors">Senior</option>
        </select>
        <button className="checkPassBtn" onClick={callDataHandler}>
          Call Data
        </button>
      </div>
      <div className="tableArea">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 1200 }} size="large">
            <TableHead>
              <TableRow>
                <TableCell>
                  <b>Sr. No</b>
                </TableCell>
                <TableCell>
                  <b>Name</b>
                </TableCell>
                <TableCell>
                  <b>Email</b>
                </TableCell>
                <TableCell>
                  <b>Gender</b>
                </TableCell>
                <TableCell>
                  <b>Phone</b>
                </TableCell>
                {typeData === "registered_juniors" ? (
                  <TableCell>
                    <b>Temp Id</b>
                  </TableCell>
                ) : (
                  <TableCell>
                    <b>Enrollment</b>
                  </TableCell>
                )}
                <TableCell>
                  <b>Verify Pay</b>
                </TableCell>
                {typeData === "registered_juniors" ? (
                  <TableCell>
                    <b>Transport</b>
                  </TableCell>
                ) : (
                  ""
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, index) => (
                <TableRow
                  key={row.phone}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.gender}</TableCell>
                  <TableCell>{row.phone}</TableCell>
                  {typeData === "registered_juniors" ? (
                    <TableCell>{row.tempId}</TableCell>
                  ) : (
                    <TableCell>{row.enrollment}</TableCell>
                  )}
                  <TableCell>
                    {row.screenshot !== "" ? (
                      <a href={row.screenshot} target="_blank" rel="noreferrer">
                        Online
                      </a>
                    ) : (
                      "Offline"
                    )}
                  </TableCell>
                  {typeData === "registered_juniors" ? (
                    <TableCell>{row.transport}</TableCell>
                  ) : (
                    ""
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div className="tableAreaMobile">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: window.innerWidth }} size="large">
            <TableHead>
              <TableRow>
                <TableCell>
                  <b>Sr. No</b>
                </TableCell>
                <TableCell>
                  <b>Name</b>
                </TableCell>
                <TableCell>
                  <b>Phone</b>
                </TableCell>
                <TableCell>
                  <b>Verify Pay</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, index) => (
                <TableRow
                  key={row.phone}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.phone}</TableCell>
                  <TableCell>
                    {row.screenshot !== "" ? (
                      <a href={row.screenshot} target="_blank" rel="noreferrer">
                        Online
                      </a>
                    ) : (
                      "Offline"
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default Admin;
