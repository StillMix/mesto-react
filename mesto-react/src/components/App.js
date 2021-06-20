import React from 'react';
import Header from './header/Header';
import Main from './main/Main';
import Footer from './footer/Footer';
import backBtn from '../images/back-button.svg';
import PopupWithForm from './PopupWithForm/PopupWithForm.js';

function handleEditAvatarClick(){
    document.querySelector('.popup_type_editAvatar').classList.add('popup__open')
}
function handleEditProfileClick(){
    document.querySelector('.popup_type_edit').classList.add('popup__open')
}

function handleAddPlaceClick(){
    document.querySelector('.popup_type_new-card').classList.add('popup__open')
}

function App() {
    return ( <>
    <div className="body">
    <div className="page">
        <Header />
        <Main onEditAvatar={handleEditAvatarClick} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick}/>
        <Footer/>
        <template className="element-template">
            <li className="element">
                <button type="button" className="element__btn-open"><img className="element__image"/></button>
                <button className="element__basket" type="button"></button>
                <div className="element__container">
                    <h3 className="element__name"></h3>
                    <button className="element__heart"></button>
                    <div className="element__likes">0</div>

                </div>
            </li>
        </template>

        <PopupWithForm name="delete"  namePopup="Вы уверены?" btn="delete-card" nameBtn="Да"  />

       <PopupWithForm name="editAvatar"  namePopup="Обновить автар" btn="create-avatar" nameBtn="Сохранить" input={
                               <label>
                               <input type="url" id="profile-avatar-input" placeholder="Новый аватар" className="input input_type_Avatar" name="avatarInput" required minlength="2" maxlength="200" />
                               <span className="popup__error profile-avatar-input-error" ></span>
                           </label>
       } />

              <PopupWithForm name="edit"  namePopup="Редактировать профиль" btn="edit" nameBtn="Сохранить" input={
                    <lable>
                    <input id="profile-name-input" type="text" placeholder="Имя" className="input input_type_name" name="NameInput" required minlength="2" maxlength="40" />
                    <span className="popup__error profile-name-input-error"></span>
                </lable>
                
       } inputTwo ={
        <label>
        <input type="text" id="profile-status-input" placeholder="О себе" className="input input_type_status" name="JobInput" required minlength="2" maxlength="200" />
        <span className="popup__error profile-status-input-error"></span>
    </label>
       } />

       <PopupWithForm name="new-card"  namePopup="Новое место" btn="create-new-card" nameBtn="Создать" input={
                    <label>
                    <input id="card-name-input" type="text" placeholder="Название" className="input input_type_nameImage" name="NameIMGInput" required minlength="2" maxlength="30" />
                    <span className="popup__error card-name-input-error"></span>
                </label>
       } 
       inputTwo={
        <label>
        <input type="url" id="card-src-input" placeholder="Ссылка на картинку" className="input input_type_src" name="SrcInput" required />
        <span className="popup__error card-src-input-error"></span>
    </label>
       }/>
    </div>

    <div className="popup popup-image">
        <div className="popup__background popup-image__background"></div>
        <div className="popup-image__overlay">
            <img aria-label="Close" type="button" src={backBtn} className="popup__btn-back popup-image__btn-image" alt="Кнопка назад" />
            <img src="#" className="popup-image__image" alt="картинка" />
            <p className="popup-image__title"></p>
        </div>
    </div>
    </div>
    </>
    );
}

export default App;