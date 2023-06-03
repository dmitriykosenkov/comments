import React from "react";
import CommentItem from "../Comment/CommentItem";
import Form from "../Form/Form";

const RepliesList = ({replies = [], auth}) => {
   return (
      <div class="replies__template">
         <aside class="replies__aside"></aside>
         {replies.map(reply => (
            <CommentItem auth={auth} comment={reply} key={reply.id}/>
         ))}
      </div>
   );
};

export default RepliesList;
