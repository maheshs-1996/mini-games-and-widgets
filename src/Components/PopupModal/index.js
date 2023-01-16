import { useState } from "react";
import "./styles.css";

const useModal = (props) => {
  const [popupProps, setPopupProps] = useState({});
  const {
    show,
    title,
    subTitle,
    CTAText = "Okay",
    CTAClick,
    close,
  } = popupProps;

  const onSubmit = (e) => {
    e.preventDefault();
    CTAClick(e);
  };

  const DialogBox = () => {
    return show ? (
      <form id="dialog-box" onSubmit={onSubmit} className="popup-modal">
        <div className="modal-wrapper">
          <span className="close-modal" onClick={close ? close : CTAClick}>
            CLOSE
          </span>
          <div className="modal-content">
            <span className="modal-title">{title}</span>
            {!!subTitle && <span className="modal-sub-title">{subTitle}</span>}

            <div className="modal-actions">
              <button type="submit" className="action-yes">
                {CTAText}
              </button>
            </div>
          </div>
        </div>
      </form>
    ) : null;
  };

  return {
    DialogBox,
    setPopupProps,
    popupProps,
  };
};

export default useModal;
