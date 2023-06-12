import { useEffect } from "react";
import styles from "./Modal.module.scss";

const Modal = ({ setIsOpen }) => {
   useEffect(() => {
      document.body.style.overflow = "hidden";
      return () => {
         document.body.style.overflow = "";
      };
   }, []);
   return (
      <>
         <div className={styles.darkBG} onClick={() => setIsOpen(false)} />
         <div className={styles.centered}>
            <div className={styles.modal}>
               <h5 className={styles.heading}>Delete comment</h5>
               <div className={styles.modalContent}>
                  Are you sure you want to delete this comment? This will remove
                  the comment and can’t be undone.
               </div>
               <div className={styles.actionsContainer}>
                  <button
                     className={`${styles.actionBtn} ${styles.cancelBtn}`}
                     onClick={() => setIsOpen(false)}
                  >
                     NO, CANCEL
                  </button>
                  <button
                     className={`${styles.actionBtn} ${styles.deleteBtn}`}
                     onClick={() => setIsOpen(false)}
                  >
                     YES, DELETE
                  </button>
               </div>
            </div>
         </div>
      </>
   );
};
export default Modal;
