import React, { useState } from "react";
import Form from "../Form/Form";
import RepliesList from "../RepliesList/RepliesList";
import { getDeleteComment } from "../../api/api";
import { v4 as uuidv4 } from 'uuid';
import ViewComment from "./ViewComment";


const CommentItem = ({ comment, auth, addOrDeleteReplyMessage }) => {
   const [showReplies, setShowReplies] = useState(false);
   const [replyMode, setReplyMode] = useState(false)
   const openReplies = () => {
      if (comment.replies.length !== 0) {
         setShowReplies((prev) => !prev);
      }
      setReplyMode((prev) => !prev);
   };
   
   const addReply = (replyText) => {
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
      }
      const commentWithReply = {
         ...comment, replies: [...comment.replies, replyMessage]
      }
      addOrDeleteReplyMessage(commentWithReply)
   }
   const deleteReply = (id) => {
      addOrDeleteReplyMessage({...comment, replies: comment.replies.filter(item => item.id !== id)})
   }
   return (
      <div className="comments__item comment">
         <ViewComment comment={comment} auth={auth} openReplies={openReplies} deleteItem={getDeleteComment} />
         {showReplies ? (
            <RepliesList auth={auth} replies={comment.replies} deleteReply={deleteReply} />
         ) : null}
         {replyMode ? <Form placeholder={`@${comment.user.username}`} addNewComment={addReply} buttonText="Reply" /> : null}
      </div>
   );
};


export default CommentItem;
