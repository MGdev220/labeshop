/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import '../assets/style/Alert.css';

const Alert = ({ message, type = 'success', duration = 5000, onClose }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      if (onClose) onClose(); // Appelle une fonction si fournie
    }, duration);

    return () => clearTimeout(timer); // Cleanup
  }, [duration, onClose]);

  const handleClose = () => {
    setShow(false);
    if (onClose) onClose(); // Appelle une fonction si fournie
  };

  return (
    show && (
      <div className={`alert alert-${type}`}>
        <span>{message}</span>
        {/* <button className="alert-close" onClick={handleClose}>
          &times;
        </button> */}
      </div>
    )
  );
};

export default Alert;
