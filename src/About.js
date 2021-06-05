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
      <h3
        style={{
          width: "70%",
          fontWeight: 300,
          textAlign: "center",
          margin: "2rem auto",
          color: isDarkMode && "#f2f2f2",
        }}
      >
        This is a simple time-tracking aplication, built just for fun in spare
        time. It allows easy transfer between timers, and will save your data
        locally, to your browser, so you can resume later without loosing
        progress.{" "}
      </h3>
    </div>
  );
}
