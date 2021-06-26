import React,{useState,useEffect} from 'react';

function Card(props) {
    function handleClick() {
        props.onCardClick(props.card.name, props.card.link);
      }  
    return (   
            <li className="element">
                <button type="button" className="element__btn-open" onClick={handleClick}><img className="element__image" src={props.card.link} /></button>
                <button className="element__basket" type="button"></button>
                <div className="element__container">
                    <h3 className="element__name">{props.card.name}</h3>
                    <button className="element__heart"></button>
                    <div className="element__likes">{props.card.likes.length}</div>

                </div>
            </li>
            
            
    


    );
}

export default Card;