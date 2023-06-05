import CommentItem from "../Comment/CommentItem";

const CommentsList = ({ comments = [], auth, addOrDeleteReplyMessage }) => {
   return (
      <div className="comments__items ">
         {comments.map((comment) => (
            <div key={comment.id}>
               <CommentItem
                  addOrDeleteReplyMessage={addOrDeleteReplyMessage}
                  comment={comment}
                  auth={auth}
               />
            </div>
         ))}
      </div>
   );
};

export default CommentsList;
