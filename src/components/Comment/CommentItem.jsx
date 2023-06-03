import React, { useState } from "react";
import Form from "../Form/Form";
import RepliesList from "../RepliesList/RepliesList";

const CommentItem = ({ comment, auth, addNewComment }) => {
   const [showReplies, setShowReplies] = useState(false);
   const [replyMode, setReplyMode] = useState(false)
   const openReplies = () => {
      if (comment.replies.length !== 0) {
         setShowReplies((prev) => !prev);
      }
      setReplyMode((prev) => !prev);
   };
   

   return (
      <div className="comments__item comment">
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
                  <div class="comment__delete _icon-delete">Delete</div>
                  <div class="comment__reply _icon-edit">Edit</div>
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
         {showReplies ? (
            <RepliesList auth={auth} replies={comment.replies} />
         ) : null}
         {replyMode ? <Form addNewComment={addNewComment} /> : null}
      </div>
   );
};

export default CommentItem;
