import "./scss/style.scss";
import "./iconfont.css";
import { useEffect, useState } from "react";
import CommentsList from "./components/CommentsList/CommentsList";
import Form from "./components/Form/Form";
import { getAddedComment, getAllComments, getAuthUser } from "./api/api";

function App() {
   const [comments, setComments] = useState([]);
   const [auth, setAuth] = useState({});

   useEffect(() => {
      getAllComments().then((res) => {
         setComments(res);
      });
      getAuthUser().then((res) => {
         setAuth(res);
      });
   }, []);
   const addNewComment = (comment) => {
      getAddedComment(comment).then((res) => {
         setComments( [...comments, res] );
      });
   };

   return (
      <div class="wrapper">
         <div class="comments">
            <CommentsList comments={comments} auth={auth} addNewComment={addNewComment} />
         </div>
         <Form addNewComment={addNewComment} />
      </div>
   );
}

export default App;
