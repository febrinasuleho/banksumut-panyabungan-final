import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import "./BackButton.css";

function BackButton() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }
    navigate("/", { replace: true });
  };

  return (
    <button type="button" className="global-back-btn" onClick={handleGoBack}>
      <FaArrowLeft /> Kembali
    </button>
  );
}

export default BackButton;
