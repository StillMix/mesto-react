import React, { useState, useEffect } from 'react';
import Header from './header/Header';
import Main from './main/Main';
import Footer from './footer/Footer';
import PopupWithForm from './PopupWithForm/PopupWithForm.js';
import ImagePopup from './ImagePopup/ImagePopup.js';
import api from '../utils/Api.js';


function App() {

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setisAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setisEditAvatarPopupOpen] = useState(false);
    const [isImagePopupOpen, setisImagePopupOpen] = useState(false);
    const [selectedCard, setselectedCard] = useState(null);

    function ESCClose(evt) {
        if (evt.key === 'Escape') {
            closeAllPopups()
        };
    }

function closeAllPopups(){
    setIsEditProfilePopupOpen(false);
    setisEditAvatarPopupOpen(false);
    setisAddPlacePopupOpen(false);
    setisImagePopupOpen(false);
    setselectedCard(null);
    document.removeEventListener('keyup', ESCClose);
}


function handleEditAvatarClick(){ 
    setisEditAvatarPopupOpen(true);
    document.addEventListener('keyup', ESCClose);
} 
function handleEditProfileClick(){ 
    setIsEditProfilePopupOpen(true)
    document.addEventListener('keyup', ESCClose);
} 
 
function handleAddPlaceClick(){ 
    setisAddPlacePopupOpen(true)
    document.addEventListener('keyup', ESCClose);
} 
const [cards, setCards] = useState([])
const handleRequest = () =>{
    api.getCards().then((data) => {

        setCards(data)
    }).catch((err) => {
        console.log(err)
    })
}


function handleCardClick(name, link){
    setisImagePopupOpen(true)
    setselectedCard({name, link})
}

React.useEffect(() =>{
    handleRequest()
}, [])




    return ( <>
    <div className="body">
    <div className="page">
        <Header />
        <Main onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} cards={cards}  onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick}/>

        <Footer/>
     <ImagePopup card={selectedCard} isOpen={isImagePopupOpen} onClose={closeAllPopups}/>
        

               <PopupWithForm name="delete" onClose={closeAllPopups}   namePopup="Вы уверены?" btn="delete-card" nameBtn="Да"  />

       <PopupWithForm name="editAvatar" isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}  namePopup="Обновить автар" btn="create-avatar" nameBtn="Сохранить">
                                          <label>
                               <input type="url" id="profile-avatar-input" placeholder="Новый аватар" className="input input_type_Avatar" name="avatarInput" required minLength="2" maxLength="200" />
                               <span className="popup__error profile-avatar-input-error" ></span>
                           </label>

       </PopupWithForm>

              <PopupWithForm name="edit" isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}   namePopup="Редактировать профиль" btn="edit" nameBtn="Сохранить"> 
                    <label>
                    <input id="profile-name-input" type="text" placeholder="Имя" className="input input_type_name" name="NameInput" required minLength="2" maxLength="40" />
                    <span className="popup__error profile-name-input-error"></span>
                </label>
                
      
        <label>
        <input type="text" id="profile-status-input" placeholder="О себе" className="input input_type_status" name="JobInput" required minLength="2" maxLength="200" />
        <span className="popup__error profile-status-input-error"></span>
    </label>
       
       </PopupWithForm>

       <PopupWithForm name="new-card" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}   namePopup="Новое место" btn="create-new-card" nameBtn="Создать"> 
                    <label>
                    <input id="card-name-input" type="text" placeholder="Название" className="input input_type_nameImage" name="NameIMGInput" required minLength="2" maxLength="30" />
                    <span className="popup__error card-name-input-error"></span>
                </label>
       
       
        <label>
        <input type="url" id="card-src-input" placeholder="Ссылка на картинку" className="input input_type_src" name="SrcInput" required />
        <span className="popup__error card-src-input-error"></span>
    </label>
       
       </PopupWithForm>
    </div>
     
    </div>
    </>
    );
}

export default App;