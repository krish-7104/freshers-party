import React from "react";
import "./Styles/Admin.css";
const Admin = () => {
  return (
    <div className="mainAdmin">
      <iframe
        title="Senior Data"
        className="airtable-embed"
        src="https://airtable.com/embed/shrjIXyFr2OObXBc2?backgroundColor=blue&viewControls=on"
        frameBorder="0"
        width="100%"
        height="100%"
      ></iframe>
    </div>
  );
};

export default Admin;
