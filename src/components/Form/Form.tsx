import { FC, useEffect, useRef, useState } from "react";

interface PropsType {
   buttonText: string;
   replyTo?: string;
   placeholder?: string;
   value?: string;
   addNewComment: (comment: string) => void;
}

const Form: FC<PropsType> = ({
   addNewComment,
   buttonText,
   placeholder,
   ...props
}) => {
   const [newComment, setNewComment] = useState("");
   const textAreaRef = useRef(null);
   const spanRef = useRef(null);
   useEffect(() => {
      if (placeholder !== "") {
         const offset = Number(spanRef.current.offsetWidth) + 4;
         textAreaRef.current.style.textIndent = offset + "px";
      }
      if (props.value) setNewComment(props.value);
   }, []);

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
                  placeholder={placeholder ? placeholder : ""}
                  ref={textAreaRef}
                  onChange={(e) => setNewComment(e.target.value)}
                  value={newComment}
               >
                  {newComment}
               </textarea>
               {props.replyTo !== "" && <span ref={spanRef}>@{props.replyTo}</span>}
            </div>
            <div className="form__btn">
               <button onClick={onSubmit}>{buttonText}</button>
            </div>
         </form>
      </section>
   );
};

export default Form;
