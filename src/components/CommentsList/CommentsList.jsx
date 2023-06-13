import CommentItem from "../Comment/CommentItem";

const CommentsList = ({
   comments = [],
   addOrDeleteReplyMessage,
   setIsOpen,


   setDeletedComment,
   setDeletedReply
}) => {
   return (
      <div className="comments__items ">
         {comments.map((comment) => (
            <div key={comment.id}>
               <CommentItem
                  comment={comment}
                  setIsOpen={setIsOpen}


                  setDeletedComment={setDeletedComment}
                  setDeletedReply={setDeletedReply}
               />
            </div>
         ))}
      </div>
   );
};

export default CommentsList;
