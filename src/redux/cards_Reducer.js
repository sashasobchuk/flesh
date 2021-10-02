export const LOGIN = 'LOGIN'
export const SET_LOGIN = 'SET_LOGIN'
export const TOGGLE_POPUP = 'TOGGLE_POPUP'

export const DOWNLOAD_CARDS = 'DOWNLOAD_CARDS'
export const SET_CARDS = 'SET_CARDS'

export const UPLOAD_CARD = 'UPLOAD_CARD'
export const SET_CARD = 'SET_CARD'

export const DELETE_CARD = 'DELETE_CARD'
export const REMOVE_CARD = 'REMOVE_CARD'

export const DOWNLOAD_TICKET = 'DOWNLOAD_TICKET'
export const SET_TICKET = 'SET_TICKET'

export const CHANGE_CARD_NAME = 'CHANGE_CARD_NAME'
export const SET_NEW_CARDNAME = 'SET_NEW_CARDNAME'

export const CHANGE_TICKETNAME = 'CHANGE_TICKETNAME'
export const SET_TICKETNAME = 'SET_TICKETNAME'

export const TAG_TICKET = 'TAG_TICKET'
export const SET_TAGTICKET = 'SET_TAGTICKET'

export const DETETE_TICKET = 'DETETE_TICKET'
export const REMOVE_TICKET = 'REMOVE_TICKET'

export const UPLOAD_NEW_TICKET = 'UPLOAD_NEW_TICKET'
export const SET_NEW_TICKET = 'SET_NEW_TICKET'

export const PIN_TO_TOP = 'PIN_TO_TOP'
export const SET_PIN_TO_TOP = 'SET_PIN_TO_TOP'

export const SORT = 'SORT'


let initState = {
    popUpDisplay:false,
    token: '',
    content: [
    {
        id: "fc1b920b-1125-4ccd-9237-c33c1faecd26",
        toDoListName: "asdf",
        pinTop: false
    }
],
    pageable: {
    sort: {
        sorted: false,
            unsorted: true,
            empty: true
    },
    offset: 0,
        pageNumber: 0,
        pageSize: 25,
        paged: true,
        unpaged: false
},
    last: true,
    totalElements: 11,
    totalPages: 1,
    number: 0,
    sort: {
    sorted: false,
        unsorted: true,
        empty: true
},
    size: 25,
    numberOfElements: 11,
    first: true,
    empty: false
}


const cardsReducer = (state = initState, action) => {
    switch (action.type) {
        case SET_LOGIN:
            return {...state,token:action.token}
        case TOGGLE_POPUP:
            return {...state,popUpDisplay:!state.popUpDisplay}
        case SET_CARDS:
            return {...state,content:action.content}
        case SET_CARD:
            return {...state,content:[...state.content,action.card]}
          case REMOVE_CARD:
            return {...state,content:[...state.content.filter(card=> {
                    return(card.id !== action.card.id) })]}

          case SET_NEW_CARDNAME:
            return {...state,content:[...state.content.map(card=> {
                    return(card.id !== action.card.id
                        ?card
                    :   action.card) })]}


        case SET_PIN_TO_TOP:
            return {...state,content:[...state.content.map(card=> {
                    return(card.id !==action.card.id
                        ? card :
                        action.card
                    )})]}
        case SORT:
             sortBypinToTop(state.content)
            return {...state,content: [...state.content] }
        case SET_TICKET:
            return {...state,content:[...state.content.map(card=> {
                    return(card.id !== action.card.id ?card :{...card,items:action.card.items}) })]}

        case SET_NEW_TICKET:
            return {...state,content:[...state.content.map(card=> {
                    return(card.id !== action.card.idCard ?card :{...card,items:[...card.items,action.card.newTicket]}) })]}
        case SET_TAGTICKET:
            return {...state,content:[...state.content.map(card=> {
                    return(card.id !== action.card.idCard
                        ?card
                        :{...card,items:[...card.items.map((ticket)=>{
                        return( ticket.id !== action.card.newTicket.id
                            ? ticket
                            :action.card.newTicket)
                        })]})})]}
        case SET_TICKETNAME:
            return {...state,content:[...state.content.map(card=> {
                    return(card.id !== action.card.idCard
                        ?card
                        :{...card,items:[...card.items.map((ticket)=>{
                        return( ticket.id !== action.card.newTicket.id
                            ? ticket
                            :action.card.newTicket)
                        })]}) })]}
        case REMOVE_TICKET:
            return {...state,content:[...state.content.map(card=> {
                    return(card.id !== action.card.id
                        ?card
                        :{...card,items:[...card.items.filter((ticket)=>{
                        return(ticket.id !==action.card.ticketId)
                    })]})})]}

        default :
            return state
    }
}


export const login = (payload) => ({type: LOGIN,payload})
export const setLogin = (token) => ({type: SET_LOGIN, token})


export const downloadCards = (payload) => ({type: DOWNLOAD_CARDS,payload})
export const setCards = (content) => ({type: SET_CARDS, content})


export const uploadCard = (payload) => ({type: UPLOAD_CARD,payload})
export const setCard = (card) => ({type: SET_CARD, card})

export const deleteCard = (payload) => ({type: DELETE_CARD,payload})
export const removeCard = (card) => ({type: REMOVE_CARD, card})


export const downloadTicket = (payload) => ({type: DOWNLOAD_TICKET,payload})
export const setTicket = (card) => ({type: SET_TICKET, card})


export const changeCardName = (payload) => ({type: CHANGE_CARD_NAME,payload})
export const setaNewCardName = (card) => ({type: SET_NEW_CARDNAME, card})

export const uploadTicket = (payload) => ({type: UPLOAD_NEW_TICKET,payload})
export const setNewTicket = (card) => ({type: SET_NEW_TICKET, card})

export const changeTicketName = (payload) => ({type: CHANGE_TICKETNAME,payload})
export const setTicketName = (card) => ({type: SET_TICKETNAME, card})

export const deteteTicket = (payload) => ({type: DETETE_TICKET,payload})
export const removeTicket = (card) => ({type: REMOVE_TICKET, card})

export const pinToTop = (payload) => ({type: PIN_TO_TOP,payload})
export const setPinToTop = (card) => ({type: SET_PIN_TO_TOP, card})
export const sortByPinToTop=()=>({type:SORT})

export const tagTicket = (payload) => ({type: TAG_TICKET,payload})
export const setTagTicket = (card) => ({type: SET_TAGTICKET, card})

export const togglePopUp=()=>({type:TOGGLE_POPUP})


function sortBypinToTop(arr) {
    arr.sort((a) => !a.pinTop ? 1 : -1)
}

export const   logout = (dispath)=> {
    localStorage.setItem('authToken','')
    dispath(togglePopUp())
}

export default cardsReducer




