import { FC } from "react";
import { AuthUserType, ReplyType } from "../../store/reducers/commentsReducer";

interface PropsType {
   comment: ReplyType;
   auth: AuthUserType;
   openReplies: () => void;
   deleteItem: (id: number) => void;
}

const ViewComment: FC<PropsType> = ({
   comment,
   auth,
   openReplies,
   deleteItem,
}) => {
   return (
      <div className="comment__inner">
         <div className="comment__author">
            <img
               src={process.env.PUBLIC_URL + comment.user.image.webp}
               alt=""
            />
            <div className="comment__author-name">
               {comment.user.username}
               {auth.username === comment.user.username ? (
                  <span>you</span>
               ) : null}
            </div>
         </div>
         <div className="comment__period">{comment.createdAt}</div>
         {auth.username !== comment.user.username ? (
            <div className="comment__actions">
               <div
                  className="comment__reply _icon-reply"
                  onClick={openReplies}
               >
                  Reply
               </div>
            </div>
         ) : (
            <div className="comment__actions">
               <div
                  className="comment__delete _icon-delete"
                  onClick={() => deleteItem(comment.id)}
               >
                  Delete
               </div>
               <div className="comment__reply _icon-edit">Edit</div>
            </div>
         )}
         <div className="comment__counter counter">
            <div className="counter__inner">
               <div className="counter__sign _icon-plus"></div>
               <div className="counter__digit">{comment.score}</div>
               <div className="counter__sign _icon-minus"></div>
            </div>
         </div>
         <div className="comment__body">{comment.content}</div>
      </div>
   );
};

export default ViewComment;
