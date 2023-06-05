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
// import { v4 as uuidv4 } from "uuid";
import { CommentType } from "./store/reducers/commentsReducer";
import { useAppSelector } from "./store/hooks";

function App() {
   const {commentsList,authUser } = useAppSelector((state) => state.comments)
   const [comments, setComments] = useState(commentsList);
   const [auth, setAuth] = useState(authUser);

   useEffect(() => {
      // getAllComments().then((res) => {
      //    setComments(res);
      // });
      // getAuthUser().then((res) => {
      //    setAuth(res);
      // });
   }, []);
   const addNewComment = (comment: string) => {
      // const newCommentBody = {
      //    id: uuidv4(),
      //    content: comment,
      //    createdAt: "just now",
      //    score: 0,
      //    user: {
      //       image: {
      //          png: "/images/avatars/image-juliusomo.png",
      //          webp: "/images/avatars/image-juliusomo.webp",
      //       },
      //       username: "juliusomo",
      //    },
      //    replies: [],
      // };
      // getAddedComment(newCommentBody).then((res) => {
      //    setComments([...comments, res]);
      // });
   };

   const addOrDeleteReplyMessage = (comment: CommentType) => {
      // getReplyMessage(comment).then((data) => {
      //    const commentWithReply = comments.map((item) => {
      //       return item.id === data.id ? data : item;
      //    });
      //    setComments(commentWithReply);
      // });
   };

   return (
      <div className="wrapper">
         <div className="comments">
            <CommentsList
               comments={comments}
               auth={auth}
               addOrDeleteReplyMessage={addOrDeleteReplyMessage}
            />
         </div>
         <Form placeholder="Add a comment..." addNewComment={addNewComment} buttonText="Send" />
      </div>
   );
}

export default App;
