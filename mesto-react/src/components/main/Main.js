import React from 'react';
import avatarEdit from '../../images/avatar-edit.svg';


let isClicked = false;



function Main(props) {
    return (   
<main className="content">
            <div className="profile">

                <img className="profile__avatar-edit" src={avatarEdit} onClick={()=>{isClicked = true; {isClicked && props.onEditAvatar()}}} />
                <img alt="Аватарка профиля" className="profile__avatar" />
                <div className="profile__info">
                    <div className="profile__container">
                        <h1 className="profile__name">Жак-Ив Кусто</h1>
                        <button aria-label="Close" type="button" className="profile__btn-edit" onClick={()=>{isClicked = true; {isClicked && props.onEditProfile()}}}></button>
                    </div>
                    <p className="profile__status">Исследователь океана</p>
                </div>
                <button className="profile__btn-add" onClick={()=>{isClicked = true; {isClicked && props.onAddPlace()}}}></button>
            </div>
            <div className="cards">
                <ul className="elements">

                </ul>
            </div>
        </main>
    );
}

export default Main;