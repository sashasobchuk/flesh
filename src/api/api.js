import * as axios from "axios";

let deploy = false
export  const errorReporte =(string,e)=>{
    if(deploy){
        alert(JSON.stringify(e) + string)
    }else {
        console.warn(JSON.stringify(e)  + string)
    }
}
export const instanse = axios.create({
    baseURL: 'https://candidate.flash-web.net/',
    headers:{
        Authorization: `Basic ${localStorage.getItem('authToken')??0 }`
    }
})

export const loginApi = async (payload) => {
    try {
        return await instanse.post(`login?username=${payload.login}&password=${payload.password}`,{},{
            auth: {
                username:payload.login,
                password:payload.password
            }
        })
    }
    catch (e) {
        errorReporte('problem in  loginApi', e)
    }
}

export const DownloadCardsApi = async (payload) => {
    try {
        return await instanse.get(`to-do?page=${payload.page}&size=${payload.size}`,{},{})
    }
    catch (e) {
        errorReporte('problem in  downloadCardsApi', e)
    }
}

export const uploadCardsApi = async (payload) => {
    try {
        return await instanse.post(`to-do?name=${payload.name}`,{},{})
    }
    catch (e) {
        errorReporte('problem in  uploadCardsApi', e)
    }
}
export const deleteCardApi = async (payload) => {
    try {
        return await instanse.delete(`to-do/${payload.id}`,{},{})
    }
    catch (e) {
        errorReporte('problem in  uploadCardsApi', e)
    }
}


export const downloadTicketApi = async (payload) => {
    try {
        return await instanse.get(`to-do/${payload.id}`,{},{})
    }
    catch (e) {
        errorReporte('problem in  uploadCardsApi', e)
    }
}
export const deleteTicektApi = async (payload) => {
    try {
        return await instanse.delete(`to-do/${payload.id}/delete-item/${payload.ticketId}`,{},{})
    }
    catch (e) {
        errorReporte('problem in  uploadCardsApi', e)
    }
}
export const pinToTopApi = async (payload) => {
    try {
        return await instanse.put(`to-do/${payload.id}/pin-to-top`,{},{})
    }
    catch (e) {
        errorReporte('problem in  uploadCardsApi', e)
    }
}


export const changeCardNameApi = async (payload) => {
    try {
        return await instanse.put(`to-do/${payload.id}?name=${payload.name}`,{},{})
    }
    catch (e) {
        errorReporte('problem in  uploadCardsApi', e)
    }
}

export const changeTicketNameApi = async (payload) => {
    try {
        return await instanse.put(`to-do/${payload.todoId}/edit-item/${payload.ticketId}`,{
            text:payload.text
        },{})
    }
    catch (e) {
        errorReporte('problem in  uploadCardsApi', e)
    }
}

export const tagTicketApi = async (payload) => {
    try {
        return await instanse.put(`to-do/${payload.id}/change-check-item/${payload.ticketId}`,{},{})
    }
    catch (e) {
        errorReporte('problem in  tagTicketApi', e)
    }
}

export const uploadNewTicketApi = async (payload) => {
    try {
        return await instanse.post(`to-do/${payload.id}/add-item`,{
            text:payload.text
        },{})
    }
    catch (e) {
        errorReporte('problem in  uploadNewTicketApi', e)
    }
}

