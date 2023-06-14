import { FC, useState } from "react";
import Form from "../Form/Form";
import RepliesList from "../RepliesList/RepliesList";
import { v4 as uuidv4 } from "uuid";
import ViewComment from "./ViewComment";
import { useAppDispatch } from "../../store/hooks";
import {
   CommentType,
   addReply,
   counterCommentsLikes,
} from "../../store/reducers/commentsReducer";

interface PropsType {
   comment: CommentType;
   setIsOpen: (value: boolean) => void;
   setDeletedComment: (value: string) => void;
   setDeletedReply: (value: string) => void;
}

const CommentItem: FC<PropsType> = ({
   comment,
   setIsOpen,
   setDeletedComment,
   setDeletedReply,
}) => {
   const [showReplies, setShowReplies] = useState(false);
   const [replyMode, setReplyMode] = useState(false);
   const [commentEditMode, setCommentEditMode] = useState(false);
   const [editedCommentID, setEditedCommentID] = useState("");

   const openReplies = () => {
      setShowReplies((prev) => !prev);
      // ! слідкуємо за тим, з реплаєм якого саме коментаря відбуваться зміни
      if (showReplies) {
         setDeletedComment("");
      } else {
         setDeletedComment("");
         setDeletedComment(comment.id);
      }
      // !======================
      setReplyMode((prev) => !prev);
   };

   const onAddReply = (replyText) => {
      setDeletedComment(comment.id); // слідкує за коментарем з відкритими реплаями

      const replyMessage = {
         id: uuidv4(),
         content: replyText,
         createdAt: "just now",
         score: 0,
         replyingTo: comment.user.username,
         user: {
            image: {
               png: "/images/avatars/image-juliusomo.png",
               webp: "/images/avatars/image-juliusomo.webp",
            },
            username: "juliusomo",
         },
      };
      const payload = { commentId: comment.id, data: replyMessage };
      dispatch(addReply(payload));
   };

   const commentsCounter = (id, mathOperation) => {
      const payload = { mathOperation, id };
      dispatch(counterCommentsLikes(payload));
   };

   const onEditComment = (data) => {
      console.log(data);
      setCommentEditMode(false);
   };

   const dispatch = useAppDispatch();
   return (
      <div className="comments__item comment">
         <ViewComment
            comment={comment}
            openReplies={openReplies}
            editMode={commentEditMode}
            setEditMode={setCommentEditMode}
            deleteItem={setDeletedComment}
            counter={commentsCounter}
            setIsOpen={setIsOpen}
            updateItem={onEditComment}
            editID={editedCommentID}
            setEditID={setEditedCommentID}
         />
         {showReplies ? (
            <RepliesList
               commentId={comment.id}
               replies={comment.replies}
               setIsOpen={setIsOpen}
               setDeletedReply={setDeletedReply}
            />
         ) : null}
         {replyMode ? (
            <Form
               replyTo={comment.user.username}
               addNewComment={onAddReply}
               buttonText="Reply"
            />
         ) : null}
      </div>
   );
};

export default CommentItem;
