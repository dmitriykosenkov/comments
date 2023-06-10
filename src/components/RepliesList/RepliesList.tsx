import ViewComment from "../Comment/ViewComment";
import { AuthUserType, ReplyType, counterRepliesLikes, deleteReplyItem } from "../../store/reducers/commentsReducer";
import { FC, useState } from "react";
import { useAppDispatch } from "../../store/hooks";

interface PropsType {
   replies: Array<ReplyType>;
   auth: AuthUserType;
   commentId: string
   setIsOpen: (data: boolean) => void;
   openReplies: () => void;
}

const RepliesList: FC<PropsType> = ({
   replies = [],
   auth,
   setIsOpen,
   openReplies,
   commentId
}) => {
   const [replyEditModeReply, setReplyEditMode] = useState(false);
   const [editID, setEditID] = useState("");
   const dispatch = useAppDispatch()
   const incrementReply = (replyId: string, mathOperation: string) => {
      const payload = {replyId, commentId, mathOperation}
      dispatch(counterRepliesLikes(payload))
   }
   const deleteReply = (replyId) => {
      const payload = {commentId, replyId}
      dispatch(deleteReplyItem(payload))
   }
   return (
      <div className="replies__template">
         <aside className="replies__aside"></aside>
         <div className="replies__items">
            {replies.map((reply: ReplyType) => {
               if (replyEditModeReply && reply.id === editID) return <div>EDIT MODE</div>;
               return (
                  <ViewComment
                     openReplies={openReplies}
                     auth={auth}
                     comment={reply}
                     key={reply.id}
                     deleteItem={deleteReply}
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
