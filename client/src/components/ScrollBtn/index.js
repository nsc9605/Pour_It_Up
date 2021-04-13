import React, { useState } from "react";

function Scroll() {
  const [showScroll, setShowScroll] = useState(false);

  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 400) {
      setShowScroll(true);
    } else if (showScroll && window.pageYOffset <= 400) {
      setShowScroll(false);
    }
  };

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  window.addEventListener("scroll", checkScrollTop);

  return (
    <>
      <div className="mx-3 float-right rounded">
        <button
          className="scrollTop"
          onClick={scrollTop}
          style={{ width: 100, height: 40, right: 125, bottom: 70, display: showScroll ? "flex" : "none" }}
        >
          Back Top
        </button>
      </div>
    </>
  );
}

export default Scroll;