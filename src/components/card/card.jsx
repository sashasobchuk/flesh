import React, { useState} from 'react';
import clas from './card.module.css'
import classes from '../cards.module.css'
import {changeCardName, deleteCard, downloadTicket, pinToTop, uploadTicket} from "../../redux/cards_Reducer";
import {useDispatch} from "react-redux";
import Ticket from "./ticket";

const Card = React.memo(({card}) => {
    const [editName,setEditName]=useState(false)
    const[ticketVisibility,setTicketsVisibility]=useState(false)
    const[name,setName]=useState('')
    const [cardName,setCardName]=useState('')

    const dispatch = useDispatch()
    function deleteHandler() {
        dispatch(deleteCard(card))
    }
    function downloadTicketsHandler() {
        if(ticketVisibility){
            setTicketsVisibility(!ticketVisibility)
        }else {
            dispatch(downloadTicket(card))
            setTicketsVisibility(!ticketVisibility)
        }
    }

    function changeNameHandler() {
        dispatch(changeCardName({id:card.id,name:cardName}))
        setName('')
        setEditName(false)
    }

    function makeTicketdHandler() {
        dispatch(uploadTicket({id:card.id,text:name}))
        setName('')
    }

    function toTopHandler() {
        dispatch(pinToTop({id:card.id,}))
    }

    return (<div className={clas.cardFolder}>
            <div key={card.id} className={clas.card}>
                <button onClick={toTopHandler} className={clas.btn}>{card.pinTop ? <span>&#11014;</span>  : ''}</button>
                <div className={clas.toDoListName} >
                    {editName
                        ?      <div>
                            <input type="text" value={cardName}
                                      onChange={(e)=>setCardName(e.currentTarget.value)}
                                      required/>
                                     <button onClick={changeNameHandler}>send</button>
                        </div>
                        :  card.toDoListName

                    }
                </div>
                <div className={clas.nav}>
                    <button className={clas.allTicekts} onClick={downloadTicketsHandler}> {ticketVisibility ? '<':'>'}</button>
                    <button className={clas.editName} onClick={()=>setEditName(!editName)} > {ticketVisibility ? 'edit+':'edit-'}</button>
                    <button className={clas.delete} onClick={deleteHandler}> X</button>
                </div>
            </div>

            <div className={clas.tickets}>
                {card.items&& ticketVisibility
                && card.items.map(ticket => (
                        <Ticket card={card} ticket={ticket}/>
                ))}
                {  ( ticketVisibility)
                    &&<div className={classes.newCard}>
                         <button onClick={makeTicketdHandler} className={classes.addBTN}> send</button>
                        <input value={name}
                              onChange={(e) => setName(e.currentTarget.value)}
                              className={classes.input}
                              placeholder={'text'}
                              type="text"
                              required/>
                     </div>}
            </div>

        </div>

    );
});

export default Card;
