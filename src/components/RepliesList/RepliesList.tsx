import ViewComment from "../Comment/ViewComment";
import { CommentType, counterRepliesLikes, editReply } from "../../store/reducers/commentsReducer";
import { FC, useState } from "react";
import { useAppDispatch } from "../../store/hooks";

interface PropsType {
   replies: Array<CommentType>;
   commentId: string
   setIsOpen: (value: boolean) => void;
   setDeletedReply: (replyId: string) => void;
}

const RepliesList: FC<PropsType> = ({
   replies = [],
   setIsOpen,
   commentId,
   setDeletedReply
}) => {
   const [replyEditMode, setReplyEditMode] = useState(false);
   const [editedReplyID, setEditedReplyID] = useState("");
   const dispatch = useAppDispatch()

   const incrementReply = (replyId: string, mathOperation: string) => {
      const payload = {replyId, commentId, mathOperation}
      dispatch(counterRepliesLikes(payload))
   }

   const onEditReply = (replyId: string, data: string) => {
      const payload = {commentId, replyId: replyId, data}
      dispatch(editReply(payload))
      setReplyEditMode(false)
   }
   return (
      <div className="replies__template">
         <aside className="replies__aside"></aside>
         <div className="replies__items">
            {replies.map((reply: CommentType) => {
               return (
                  <ViewComment
                     comment={reply}
                     key={reply.id}
                     deleteItem={setDeletedReply}
                     editID={editedReplyID}
                     setEditID={setEditedReplyID}
                     editMode={replyEditMode}
                     setEditMode={setReplyEditMode}
                     setIsOpen={setIsOpen}
                     counter={incrementReply}
                     updateItem={onEditReply}
                  />
               );
            })}
         </div>
      </div>
   );
};

export default RepliesList;
