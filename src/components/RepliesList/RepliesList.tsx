import ViewComment from "../Comment/ViewComment";
import { AuthUserType, CommentType, counterRepliesLikes, deleteReplyItem } from "../../store/reducers/commentsReducer";
import { FC, useState } from "react";
import { useAppDispatch } from "../../store/hooks";

interface PropsType {
   replies: Array<CommentType>;
   commentId: string
   setIsOpen: (value: boolean) => void;
   // openReplies: () => void;
   setDeletedReply: (replyId: string) => void;
}

const RepliesList: FC<PropsType> = ({
   replies = [],
   setIsOpen,
   // openReplies,
   commentId,


   setDeletedReply
}) => {
   const [replyEditModeReply, setReplyEditMode] = useState(false);
   const [editID, setEditID] = useState("");
   const dispatch = useAppDispatch()
   const incrementReply = (replyId: string, mathOperation: string) => {
      const payload = {replyId, commentId, mathOperation}
      dispatch(counterRepliesLikes(payload))
   }
   
   return (
      <div className="replies__template">
         <aside className="replies__aside"></aside>
         <div className="replies__items">
            {replies.map((reply: CommentType) => {
               if (replyEditModeReply && reply.id === editID) return <div>EDIT MODE</div>;
               return (
                  <ViewComment
                     // openReplies={openReplies}
                     comment={reply}
                     key={reply.id}
                     deleteItem={setDeletedReply}
                     setEditMode={setReplyEditMode}
                     setIsOpen={setIsOpen}
                     setEditID={setEditID}
                     counter={incrementReply}
                  />
               );
            })}
         </div>
      </div>
   );
};

export default RepliesList;
