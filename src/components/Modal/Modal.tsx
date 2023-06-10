import s from "./Modal.module.scss";

const Modal = ({ setIsOpen }) => {
   return (
      <>
      <div className={s.darkBG} onClick={() => setIsOpen(false)} />
      </>
   )
 };
export default Modal