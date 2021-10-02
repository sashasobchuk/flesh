import React, {useState} from 'react';
import clas from "./card.module.css";
import {useDispatch} from "react-redux";
import {changeTicketName, deteteTicket, tagTicket} from "../../redux/cards_Reducer";

const Ticket = ({card,ticket}) => {
    const dispatch = useDispatch()
    const [editvisibiliti,seteditvisibiliti]=useState(false)
    const [text,setName]=useState()

    function deleteHandler() {
    dispatch(deteteTicket({id:card.id,ticketId:ticket.id}))
    }

    function changeNameHandler() {
        dispatch(changeTicketName({todoId:card.id,ticketId:ticket.id,text}))
        seteditvisibiliti(!editvisibiliti)
    }

    const setTagHandler = () => {
        dispatch(tagTicket({id: card.id,ticketId:ticket.id}))
    }

    return (
            <div key={ticket.id} className={clas.card} style={{backgroundColor: ticket.checked ? '#ddd94e' : 'white'}}>
                <button onClick={setTagHandler} className={clas.btn}>{ticket.checked ? 'O' : ''}</button>
                <div className={clas.toDoListName}>{
                    editvisibiliti
                        ?<div><input type="text" onChange={(e)=>setName(e.currentTarget.value)} required={true}/> <button onClick={()=>changeNameHandler()}>send</button></div>
                        : ticket.itemText}
                </div>

                <div className={clas.nav}>
                    <button className={clas.allTicekts}> ></button>
                    <button className={clas.editName} onClick={()=>seteditvisibiliti(!editvisibiliti)} > {editvisibiliti ? 'edit+':'edit-'}</button>
                    <button className={clas.delete} onClick={deleteHandler}> X</button>

                </div>
            </div>
    );
};

export default Ticket;
