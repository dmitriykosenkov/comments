import CommentItem from "../Comment/CommentItem";

const CommentsList = ({ comments = [], auth, addNewComment }) => {
   return (
      <div className="comments__items ">
         {comments.map((comment) => (
            <div key={comment.id}>
               <CommentItem addNewComment={addNewComment} comment={comment} auth={auth}/>
            </div>
         ))}
      </div>
   );
};

export default CommentsList;
