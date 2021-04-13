import React, { useState, useEffect } from "react";

function Scroll() {
  const [showScrollBtn, setShowScrollBtn] = useState(false);
  // const [scrollTop, setScrollTop] = useState()

  useEffect(() => {
    checkScrollUp()
  },[])

  const checkScrollUp = () => {
    if (!showScrollBtn && window.pageYOffset > 400) {
      setShowScrollBtn(true);
    } else if (showScrollBtn && window.pageYOffset <= 400) {
      setShowScrollBtn(false);
    }
  };

  
  // const handleScrollUp = () => {
  //   checkScrollUp("scroll")

    const scrollUp = () => {
      window.scrollTo({ Up: 0, behavior: "smooth" });
    };
    window.addEventListener("scroll", checkScrollUp);
    // setScrollTop(scrollUp)



  return (
    <>
      <div>
        <button
          className="scrollUp"
          onClick={scrollUp}
          style={{ height: 40, display: showScrollBtn ? "flex" : "none" }}
        >
          Back Up
        </button>
      </div>
    </>
  );
}

export default Scroll;
