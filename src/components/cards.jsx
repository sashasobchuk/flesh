import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import PopUp from "./PopUp/PopUp";
import {downloadCards, logout, uploadCard} from "../redux/cards_Reducer";
import Card from "./card/card";
import clas from './cards.module.css'

const Cards = () => {
    const cards = useSelector((state) => state.cardsPage.content)
    const[name,setName]=useState('')
    const [addNewCardVisibility,setAddNewCardVisibility]=useState(true)

    const dispatch = useDispatch()
        useEffect(()=>{
            dispatch(downloadCards({page:0, size:25}))
        },[dispatch])

    function makeCardHandler() {
        dispatch(uploadCard({name}))
        setName('')
    }



    return (
        <div className={clas.cardsFolder}>
            <PopUp/>
            {cards.map(card=>(
                    <Card key={card.id}  card={card} />
            ))}

            {addNewCardVisibility
                ? <div className={clas.addContainer} onClick={()=>setAddNewCardVisibility(!addNewCardVisibility)}> +++ add new item +++</div>
                : <div className={clas.addContainer} >
                <div className={clas.newCard}>
                    <button onClick={makeCardHandler} className={clas.addBTN}> send</button>
                    <input value={name} onChange={(e) => setName(e.currentTarget.value)}
                           className={clas.input} placeholder={'text'} type="text" required/>
                </div>
            </div>
            }
            <div  className={clas.newCard}>
                <button onClick={()=>logout(dispatch)} className={clas.addBTN}> loguot</button>
            </div>
        </div>
    );
};

export default Cards;
