import { FC, forwardRef } from "react";
import { useTextarea } from "../../hooks/useTextarea";

type PropsType = {
   placeholder: string;
   value?: string
   // textAreaRef: any
   // spanRef: any
   newComment: string;
   replyTo: string;
   setNewComment: (value: string) => void;
};

const FormBlock: FC<PropsType> = forwardRef(
   ({ newComment, placeholder, replyTo, setNewComment, value }) => {
      const { spanRef, textAreaRef, offset } = useTextarea(placeholder);

      return (
         <div className="form__text">
            <textarea
               style={{ textIndent: offset}}
               placeholder={placeholder ? placeholder : ""}
               ref={textAreaRef}
               onChange={(e) => setNewComment(e.target.value)}
               value={value}
            >
               {newComment}
            </textarea>
            {replyTo !== "" && <span ref={spanRef}>{replyTo}</span>}
         </div>
      );
   }
);
export default FormBlock;
