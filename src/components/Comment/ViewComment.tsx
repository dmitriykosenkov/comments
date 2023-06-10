import { FC, useState } from "react";
import { AuthUserType, ReplyType } from "../../store/reducers/commentsReducer";

interface PropsType {
   comment: ReplyType;
   auth: AuthUserType;
   setIsOpen: (data: boolean) => void
   setEditMode: (data: boolean) => void;
   openReplies: () => void;
   deleteItem: (id: string) => void;
   setEditID?: (id: string) => void;
   counter?: (id: string, mathOperation: string) => void;
   // incrementReplyCounter?: (id: string) => void;
}

const ViewComment: FC<PropsType> = ({
   setIsOpen,
   comment,
   auth,
   openReplies,
   deleteItem,
   setEditMode,
   ...props
}) => {
   const updateReply = () => {
      if (props.setEditID) {
         setEditMode(true);
         props.setEditID(comment.id);
      } else {
         setEditMode(true);
      }
   };

   const onCounter = (e) => {
      const mathOperation = e.target.getAttribute('data-')
      if (props.setEditID) {
         props.counter(comment.id, mathOperation )
      } else {
         props.counter(comment.id, mathOperation)
      }
   }

   const onDelete = () => {
      if (props.setEditID) {
         deleteItem(comment.id)
      } else {
         deleteItem(comment.id)
      }
   }
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
            <div className="comment__period">{comment.createdAt}</div>
         </div>
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
                  // onClick={() => deleteItem(comment.id)}
                  onClick={() => setIsOpen(true)}
               >
                  Delete
               </div>
               <div className="comment__reply _icon-edit" onClick={updateReply}>
                  Edit
               </div>
            </div>
         )}
         <div className="comment__counter counter">
            <div className="counter__inner">
               <div className="counter__sign _icon-plus" data-='increment' onClick={onCounter}></div>
               <div className="counter__digit">{comment.score}</div>
               <div className="counter__sign _icon-minus" data-="decrement" onClick={onCounter}></div>
            </div>
         </div>
         <div className="comment__body">{comment.content}</div>
      </div>
   );
};

export default ViewComment;
