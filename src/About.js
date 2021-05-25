import React from "react";

export default function About(props) {
  const { isDarkMode } = props;

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "2rem",
      }}
    >
      <h1 style={{ color: isDarkMode && "#f2f2f2" }}>About</h1>
    </div>
  );
}
