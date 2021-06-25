import React from 'react';
import backBtn from '../../images/back-button.svg';


function PopupWithForm(props) {
    {props.card && document.querySelector('.popup-image').classList.add('popup__open')}
    return (   
        <div className="popup popup-image">
        <div className="popup__background popup-image__background"></div>
        <div className="popup-image__overlay">
            <img aria-label="Close" type="button" src={backBtn} className="popup__btn-back popup-image__btn-image" alt="Кнопка назад"  onClick={props.onClose}/>
            <img src="#" className="popup-image__image" alt="картинка" />
            <p className="popup-image__title"></p>
        </div>
    </div>
    );
}

export default PopupWithForm;