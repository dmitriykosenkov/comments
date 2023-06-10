import { useEffect } from "react";
import CommentItem from "../Comment/CommentItem";

const CommentsList = ({ comments = [], auth, addOrDeleteReplyMessage, setIsOpen}) => {
   
   return (
      <div className="comments__items ">
         {comments.map((comment) => (
            <div key={comment.id}>
               <CommentItem
                  addOrDeleteReplyMessage={addOrDeleteReplyMessage}
                  comment={comment}
                  auth={auth}
                  setIsOpen={setIsOpen}
               />
            </div>
         ))}
      </div>
   );
};

export default CommentsList;
