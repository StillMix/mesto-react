import React from 'react';
import backBtn from '../../images/back-button.svg';
let isClicked = false; 
function PopupWithForm(props) {
       {props.isOpen && document.querySelector(`.popup_type_${props.name}`).classList.add('popup__open')}
    return (   
        <div className={`popup popup_type_${props.name}`}>
            <div className={`popup__background background-popup-${props.name}`}></div>
            <div className="popup__overlay">
                <button aria-label="Close" className={`popup__btn-back btn-back-popup-${props.name}`} type="button" onClick={props.onClose}><img src={backBtn} className="popup__image" alt="Кнопка назад"/></button>
                <h2 className="popup__title">{props.namePopup}</h2>
                <form name={`form-${props.name}-profile`} className={`form form_type_${props.name}`}>
                {props.isOpen}
                {props.input}
                {props.inputTwo}
                    <button className={`popup__btn-create popup-btn-${props.btn}`} type="submit">{props.nameBtn}</button>
                </form>
            </div>
        </div>
    );
}

export default PopupWithForm;