import axios from "axios";

const instanceAxios = axios.create({
   baseURL: "http://localhost:4001/"
})

export const getAllComments = async () => {
   const response = await instanceAxios.get(`comments`)
   return response.data
} 
export const getAuthUser = async () => {
   const response = await instanceAxios.get(`currentUser`)
   return response.data
}
export const getAddedComment = async (newComment) => {
   const response = await instanceAxios.post(`comments`, newComment)
   return response.data
}
export const getDeleteComment = async (id) => {
   const response = await instanceAxios.delete(`comments/${id}`)
   console.log(response.data);
}
export const getReplyMessage = async (comment) => {
   const response = await instanceAxios.put(`comments/${comment.id}`, comment)
   return response.data
}
