import { FC } from "react";
import { CommentType } from "../../store/reducers/commentsReducer";
import CommentItem from "../Comment/CommentItem";

interface PropsType {
   comments: Array<CommentType>
   setIsOpen: (data: boolean) => void
   setDeletedComment: (id: string) => void
   setDeletedReply: (id: string) => void
}

const CommentsList: FC<PropsType> = ({
   comments = [],
   setIsOpen,
   setDeletedComment,
   setDeletedReply,
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
