import React, { useState } from 'react';
import Header from './header/Header';
import Main from './main/Main';
import Footer from './footer/Footer';
import Card from './Card/Card.js'
import PopupWithForm from './PopupWithForm/PopupWithForm.js';
import ImagePopup from './ImagePopup/ImagePopup.js';
import api from '../utils/Api.js';


function App() {

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setisAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setisEditAvatarPopupOpen] = useState(false);
    const [selectedCard, setselectedCard] = useState(false);

    function ESCClose(evt) {
        if (evt.key === 'Escape') {
            closeAllPopups()
        };
    }

function closeAllPopups(){
    setIsEditProfilePopupOpen(false);
    setisEditAvatarPopupOpen(false);
    setisAddPlacePopupOpen(false);
    setselectedCard(false);
    document.querySelector('.popup__open').classList.remove('popup__open')
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
        const cardInfo = data.map((item) => {
            return{
                name: item.name,
                link: item.link,
                likes: item.likes,
            }
        })
        setCards(cardInfo)
    }).catch((err) => {
        console.log(err)
    })
}


function handleCardClick(name, link){
    const imageName = document.querySelector('.popup-image__title');
    const imageSrc = document.querySelector('.popup-image__image');
    imageName.textContent = name;
    imageSrc.src = link;
    setselectedCard(true)
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
     <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
        

               <PopupWithForm name="delete" onClose={closeAllPopups}   namePopup="Вы уверены?" btn="delete-card" nameBtn="Да"  />

       <PopupWithForm name="editAvatar" isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}  namePopup="Обновить автар" btn="create-avatar" nameBtn="Сохранить" input={
                               <label>
                               <input type="url" id="profile-avatar-input" placeholder="Новый аватар" className="input input_type_Avatar" name="avatarInput" required minlength="2" maxlength="200" />
                               <span className="popup__error profile-avatar-input-error" ></span>
                           </label>
       } />

              <PopupWithForm name="edit" isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}   namePopup="Редактировать профиль" btn="edit" nameBtn="Сохранить" input={
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

       <PopupWithForm name="new-card" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}   namePopup="Новое место" btn="create-new-card" nameBtn="Создать" input={
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
     
    </div>
    </>
    );
}

export default App;