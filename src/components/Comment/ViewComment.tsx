import { FC, useState } from "react";
import { CommentType } from "../../store/reducers/commentsReducer";
import { useAppSelector } from "../../store/hooks";
import Button from "../Button/Button";

interface PropsType {
   comment: CommentType;
   editMode: boolean;
   setIsOpen: (data: boolean) => void;
   setEditMode: (value: any) => void;
   deleteItem: (id: string) => void;
   openReplies?: () => void;
   editID?: string;
   setEditID?: (id: string) => void;
   updateItem?: (value: string) => void;
   counter?: (id: string, mathOperation: string) => void;
}

const ViewComment: FC<PropsType> = ({
   comment,
   editMode,
   setEditMode,
   setIsOpen,
   deleteItem,
   openReplies,
   ...props
}) => {
   const { authUser: auth } = useAppSelector((state) => state.comments);
   const [localEditedComment, setlocalEditedComment] = useState(
      comment.content
   );
   const onSubmitChangedMessage = () => {
      props.updateItem(localEditedComment);
      setEditMode(false);
   };
   const openEditMode = () => {
      setEditMode((prev) => !prev);
      props.setEditID(comment.id);
   };

   const onCounter = (e) => {
      const mathOperation = e.target.getAttribute("data-");
      if (props.setEditID) {
         props.counter(comment.id, mathOperation);
      } else {
         props.counter(comment.id, mathOperation);
      }
   };

   const onDelete = () => {
      deleteItem(comment.id);
      setIsOpen(true);
   };
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
               <div className="comment__delete _icon-delete" onClick={onDelete}>
                  Delete
               </div>
               <div
                  className="comment__reply _icon-edit"
                  onClick={openEditMode}
               >
                  Edit
               </div>
            </div>
         )}
         <div className="comment__counter counter">
            <div className="counter__inner">
               <div
                  className="counter__sign _icon-plus"
                  data-="increment"
                  onClick={onCounter}
               ></div>
               <div className="counter__digit">{comment.score}</div>
               <div
                  className="counter__sign _icon-minus"
                  data-="decrement"
                  onClick={onCounter}
               ></div>
            </div>
         </div>
         {editMode && props.editID === comment.id ? (
            <div className="comment__body comment__body-edit">
               <div className="form__text">
                  <textarea
                     onChange={(event) =>
                        setlocalEditedComment(event.target.value)
                     }
                     value={localEditedComment}
                  ></textarea>
               </div>
               <div className="form__btn-edit">
                  <Button
                     buttonText="Update"
                     onSubmit={onSubmitChangedMessage}
                  />
               </div>
            </div>
         ) : (
            <div className="comment__body">
               {comment.replyingTo && <span>@{comment.replyingTo}</span>}{" "}
               {comment.content}
            </div>
         )}
      </div>
   );
};

export default ViewComment;
