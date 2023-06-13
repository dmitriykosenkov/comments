import { FC } from "react";
import { CommentType } from "../../store/reducers/commentsReducer";
import { useAppSelector } from "../../store/hooks";

interface PropsType {
   comment: CommentType;
   setIsOpen: (data: boolean) => void
   setEditMode: (data: boolean) => void;
   deleteItem: (id: string) => void;
   openReplies?: () => void;
   setEditID?: (id: string) => void;
   counter?: (id: string, mathOperation: string) => void;
}

const ViewComment: FC<PropsType> = ({
   setIsOpen,
   comment,
   openReplies,
   deleteItem,
   setEditMode,
   ...props
}) => {
   const {authUser: auth} = useAppSelector(state => state.comments)
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
      deleteItem(comment.id)
      setIsOpen(true)
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
                  onClick={onDelete}
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
         <div className="comment__body"><span>@{comment.replyingTo}</span> {comment.content}</div>
      </div>
   );
};

export default ViewComment;
