import React from "react";
import ReactDOM from "react-dom";
import modules from "../UI/Modal.module.css";
const Backdrop = () => {
  return <div className={modules.backdrop} />;
};

const Overlay = (props) => {
  return (
    <div className={modules.modal}>
      <div className={modules.content}>{props.children}</div>
    </div>
  );
};

const Modal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(<Backdrop />, document.getElementById("backdrop"))}
      {ReactDOM.createPortal(
        <Overlay>{props.children}</Overlay>,
        document.getElementById("backdrop")
      )}
    </>
  );
};

export default Modal;
