import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface CommentType {
   id: string
   content: string
   createdAt: string
   score: number
   user: {
      image: {
         png: string
         webp: string
      },
      username: string
   }
   replyingTo?: string
   replies?: Array<CommentType>
}
export interface AuthUserType {
   image: {
      png: string
      webp: string
   },
   username: string
}
export interface CommentActionType {
   id: string
   mathOperation: string
}
export interface ReplyActionType {
   commentId: string
   replyId: string
   mathOperation?: string
}


export interface InitialStateType {
   authUser: AuthUserType
   commentsList: Array<CommentType>
}


const initialState: InitialStateType = {
   authUser: {
      username: "juliusomo",
      image: {
         png: "/images/avatars/image-juliusomo.png",
         webp: "/images/avatars/image-juliusomo.webp"
      }
   },
   commentsList: [
      {
         id: "1",
         content: "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
         createdAt: "1 month ago",
         score: 12,
         user: {
            image: {
               png: "/images/avatars/image-amyrobson.png",
               webp: "/images/avatars/image-amyrobson.webp"
            },
            username: "amyrobson"
         },
         replies: []
      },
      {
         id: "2",
         content: "Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
         createdAt: "2 weeks ago",
         score: 5,
         user: {
            image: {
               png: "/images/avatars/image-maxblagun.png",
               webp: "/images/avatars/image-maxblagun.webp"
            },
            username: "maxblagun"
         },
         replies: [
            {
               id: "6",
               content: "I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
               createdAt: "2 days ago",
               score: 2,
               replyingTo: "ramsesmiron",
               user: {
                  image: {
                     png: "/images/avatars/image-juliusomo.png",
                     webp: "/images/avatars/image-juliusomo.webp"
                  },
                  username: "juliusomo"
               }
            },
            {
               id: "3",
               content: "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
               createdAt: "1 week ago",
               score: 4,
               replyingTo: "maxblagun",
               user: {
                  image: {
                     png: "/images/avatars/image-ramsesmiron.png",
                     webp: "/images/avatars/image-ramsesmiron.webp"
                  },
                  username: "ramsesmiron"
               }
            },
            {
               id: "4",
               content: "I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
               createdAt: "2 days ago",
               score: 2,
               replyingTo: "ramsesmiron",
               user: {
                  image: {
                     png: "/images/avatars/image-juliusomo.png",
                     webp: "/images/avatars/image-juliusomo.webp"
                  },
                  username: "juliusomo"
               }
            }
         ]
      },
      {
         id: "5",
         content: "Impressive!",
         createdAt: "1 month ago",
         score: 12,
         user: {
            image: {
               png: "/images/avatars/image-juliusomo.png",
               webp: "/images/avatars/image-juliusomo.webp"
            },
            username: "juliusomo"
         },
         replies: []
      },
   ]
}

const commentsSlice = createSlice({
   initialState,
   name: 'comments',
   reducers: {
      addNewComment: (state, action: PayloadAction<CommentType>) => {
         state.commentsList.push(action.payload)
      },
      deleteComment: (state, action: PayloadAction<string>) => {
         state.commentsList = state.commentsList.filter(item => item.id !== action.payload)
      },

      addReply: (state, action: PayloadAction<{ commentId: string, data: CommentType }>) => {
         state.commentsList.map(comment => comment.id === action.payload.commentId ? comment.replies.push(action.payload.data) : comment)
      },
      deleteReplyItem: (state, action: PayloadAction<ReplyActionType>) => {
         state.commentsList.map(comment => {
            if (comment.id === action.payload.commentId) {
               comment.replies = comment.replies.filter(reply => action.payload.replyId !== reply.id)
            }
         })
      },
      editComment: (state, action: PayloadAction<{ commentId: string, data: string }>) => {
         state.commentsList.map(comment => {
            if (comment.id === action.payload.commentId) {
               comment.content = action.payload.data
               return comment
            } else {
               return comment
            }
         })
      },
      editReply: (state, action: PayloadAction<{ commentId: string, replyId: string, data: string }>) => {
         console.log(action.payload);
         state.commentsList.map(comment => {
            if (comment.id === action.payload.commentId) {
               comment.replies.map(reply => {
                  if (reply.id === action.payload.replyId) {
                     reply.content = action.payload.data
                     return reply
                  } else {
                     return reply
                  }
               })
            } else {
               return comment
            }
         })
      },

      counterCommentsLikes: (state, action: PayloadAction<CommentActionType>) => {
         state.commentsList.map(item => {
            if (action.payload.id === item.id) {
               return { ...item, score: action.payload.mathOperation === 'increment' ? item.score++ : item.score-- }
            } else {
               return item
            }
         })
      },
      counterRepliesLikes: (state, action: PayloadAction<ReplyActionType>) => {
         state.commentsList.map(comment => {
            if (action.payload.commentId === comment.id) {
               comment.replies.map(reply => {
                  if (reply.id === action.payload.replyId) {
                     const operation = action.payload.mathOperation === 'increment' ? reply.score++ : reply.score--
                     return { ...reply, reply: operation }
                  } else {
                     return reply
                  }
               })
            }
         })
      }
   },
})


export const { addNewComment, addReply, deleteComment, deleteReplyItem, editComment, editReply, counterCommentsLikes, counterRepliesLikes } = commentsSlice.actions
export default commentsSlice.reducer