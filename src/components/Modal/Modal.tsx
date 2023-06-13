import { useEffect } from "react";
import styles from "./Modal.module.scss";

const Modal = ({ setIsOpen, deleteItem }) => {
   useEffect(() => {
      document.body.style.overflow = "hidden";
      return () => {
         document.body.style.overflow = "";
      };
   }, []);
   const onDelete = () => {
      deleteItem()
      setIsOpen(false)
   }

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
                     onClick={onDelete}
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
