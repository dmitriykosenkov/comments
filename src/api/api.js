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