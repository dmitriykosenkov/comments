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
import {
   addNewComment,
   deleteComment,
   deleteReplyItem,
} from "./store/reducers/commentsReducer";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import Modal from "./components/Modal/Modal";

// Lorem ipsum dolor sit amet consectetur adipisicing elit. Est, molestiae mollitia vel at quasi quae harum ipsa fugiat. Aliquid esse dolore blanditiis assumenda eum illo sed pariatur itaque placeat numquam!

function App() {
   const { commentsList } = useAppSelector((state) => state.comments);
   const dispatch = useAppDispatch();
   const [isOpen, setIsOpen] = useState(false);

   const [deletedCommentId, setDeletedCommentId] = useState("");
   const [deletedReplyId, setDeletedReplyId] = useState("");
   
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
      dispatch(addNewComment(newCommentBody));
   };

   const deleteItem = () => {
      if (deletedReplyId) {
         const payload = {
            commentId: deletedCommentId,
            replyId: deletedReplyId,
         };
         dispatch(deleteReplyItem(payload));
         setDeletedReplyId("");
      } else {
         dispatch(deleteComment(deletedCommentId));
         // setDeletedCommentId("");
      }
   };

   return (
      <div className="wrapper">
         <div className="comments">
            <CommentsList
               comments={commentsList}
               setIsOpen={setIsOpen}
               setDeletedComment={setDeletedCommentId}
               setDeletedReply={setDeletedReplyId}
            />
         </div>
         <Form
            placeholder="Add a comment..."
            addNewComment={addComment}
            buttonText="Send"
         />
         {isOpen && <Modal setIsOpen={setIsOpen} deleteItem={deleteItem} />}
      </div>
   );
}

export default App;
