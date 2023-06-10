import React, { useEffect, useState } from "react";
import Form from "../Form/Form";
import RepliesList from "../RepliesList/RepliesList";
import { getDeleteComment } from "../../api/api";
import { v4 as uuidv4 } from "uuid";
import ViewComment from "./ViewComment";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
   addReply,
   counterCommentsLikes,
   deleteItem,
} from "../../store/reducers/commentsReducer";

const CommentItem = ({ comment, auth, setIsOpen}) => {
   const [showReplies, setShowReplies] = useState(false);
   const [replyMode, setReplyMode] = useState(false);
   const [commentEditMode, setCommentEditMode] = useState(false);
   useEffect(() => {
      console.log("render");
   }, []);
   const openReplies = () => {
      if (comment.replies.length !== 0) {
         setShowReplies((prev) => !prev);
      }
      setReplyMode((prev) => !prev);
   };

   const onAddReply = (replyText) => {
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
      const payload = {commentId: comment.id, data: replyMessage}
      dispatch(addReply(payload));
   };
  
   

   const commentsCounter = (id, mathOperation) => {
      const payload = { mathOperation, id };
      dispatch(counterCommentsLikes(payload));
   };

   const deleteComment = (id) => {
      dispatch(deleteItem(id));
   };
   const editComment = (data) => {
      console.log(data);
   };

   const dispatch = useAppDispatch();
   return (
      <div className="comments__item comment">
         {!commentEditMode ? (
            <ViewComment
               comment={comment}
               auth={auth}
               openReplies={openReplies}
               setEditMode={setCommentEditMode}
               deleteItem={deleteComment}
               counter={commentsCounter}
               editComment={editComment}
               setIsOpen={setIsOpen}
            />
         ) : (
            <div>EDIT MODE</div>
         )}
         {showReplies ? (
            <RepliesList
               commentId={comment.id}
               auth={auth}
               replies={comment.replies}
               // deleteReply={deleteReply}
            />
         ) : null}
         {replyMode ? (
            <Form
               placeholder={`@${comment.user.username}`}
               addNewComment={onAddReply}
               buttonText="Reply"
            />
         ) : null}
      </div>
   );
};

export default CommentItem;
