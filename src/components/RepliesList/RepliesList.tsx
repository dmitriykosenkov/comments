import ViewComment from "../Comment/ViewComment";
import { AuthUserType, ReplyType } from "../../store/reducers/commentsReducer";
import { FC } from "react";

interface PropsType {
   replies: Array<ReplyType>;
   auth: AuthUserType;
   deleteReply: (id: number) => void;
   openReplies: () => void;
}

const RepliesList: FC<PropsType> = ({
   replies = [],
   auth,
   deleteReply,
   openReplies,
}) => {
   return (
      <div className="replies__template">
         <aside className="replies__aside"></aside>
         <div className="replies__items">
            {replies.map((reply: ReplyType) => (
               <ViewComment
                  openReplies={openReplies}
                  auth={auth}
                  comment={reply}
                  key={reply.id}
                  deleteItem={deleteReply}
               />
            ))}
         </div>
      </div>
   );
};

export default RepliesList;
