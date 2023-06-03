import React, { useState } from "react";

const Form = ({addNewComment}) => {
   const [newComment, setNewComment] = useState("");

   const createNewComment = (e) => {
      e.preventDefault()
      const newCommentBody = {
         id: new Date(),
         content: newComment,
         createdAt: "just now",
         score: 0,
         user: {
            image: {
               png: "/images/avatars/image-juliusomo.png",
               webp: "/images/avatars/image-juliusomo.webp",
            },
            username: "juliusomo",
         },
         replies: [],
      };
      addNewComment(newCommentBody)
   };


   return (
      <section class="form">
         <form class="form__block">
            <div class="form__image">
               <img
                  src={
                     process.env.PUBLIC_URL +
                     "/images/avatars/image-juliusomo.webp"
                  }
                  alt=""
               />
            </div>
            <div class="form__text">
               <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
               ></textarea>
            </div>
            <div class="form__btn">
               <button onClick={createNewComment}>Send</button>
            </div>
         </form>
      </section>
   );
};

export default Form;
