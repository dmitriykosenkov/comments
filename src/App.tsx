import "./scss/style.scss";
import "./iconfont.css";
import { useEffect, useState } from "react";
import CommentsList from "./components/CommentsList/CommentsList";
import Form from "./components/Form/Form";
// import {
//    getAddedComment,
//    getAllComments,
//    getAuthUser,
//    getReplyMessage,
// } from "./api/api";
import { v4 as uuidv4 } from "uuid";
import { CommentType, addNewComment } from "./store/reducers/commentsReducer";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import Modal from "./components/Modal/Modal";

// Lorem ipsum dolor sit amet consectetur adipisicing elit. Est, molestiae mollitia vel at quasi quae harum ipsa fugiat. Aliquid esse dolore blanditiis assumenda eum illo sed pariatur itaque placeat numquam!



function App() {
   const {commentsList,authUser } = useAppSelector((state) => state.comments)
   const dispatch = useAppDispatch()
   const [isOpen, setIsOpen] = useState(false);

   const addComment = (comment: string) => {
      const newCommentBody = {
         id: uuidv4(),
         content: comment,
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
      dispatch(addNewComment(newCommentBody))
   };

   return (
      <div className="wrapper">
         <div className="comments">
            <CommentsList
               comments={commentsList}
               auth={authUser}
               setIsOpen={setIsOpen}
            />
         </div>
         <Form placeholder="Add a comment..." addNewComment={addComment} buttonText="Send" />
         {isOpen && <Modal setIsOpen={setIsOpen} />}
      </div>
   );
}

export default App;
