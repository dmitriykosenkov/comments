import { FC, useState } from "react";

interface PropsType {
   addNewComment: (comment: string) => void;
   buttonText: string;
   placeholder: string;
}

const Form: FC<PropsType> = ({ addNewComment, buttonText, placeholder }) => {
   const [newComment, setNewComment] = useState("");

   const onSubmit = (e) => {
      e.preventDefault();
      addNewComment(newComment);
      setNewComment("");
   };

   return (
      <section className="form">
         <form className="form__block">
            <div className="form__image">
               <img
                  src={
                     process.env.PUBLIC_URL +
                     "/images/avatars/image-juliusomo.webp"
                  }
                  alt=""
               />
            </div>
            <div className="form__text">
               <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder={placeholder}
               ></textarea>
            </div>
            <div className="form__btn">
               <button onClick={onSubmit}>{buttonText}</button>
            </div>
         </form>
      </section>
   );
};

export default Form;
