import React, { useState } from 'react';
import Header from './header/Header';
import Main from './main/Main';
import Footer from './footer/Footer';
import PopupWithForm from './PopupWithForm/PopupWithForm.js';
import EditProfilePopup from './EditProfilePopup/EditProfilePopup.js';
import ImagePopup from './ImagePopup/ImagePopup.js';
import api from '../utils/Api.js';
import { userContext} from '../contexts/CurrentUserContext.js';
import EditAvatarPopup from './EditAvatarPopup/EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup/AddPlacePopup.js';

function App() {
    const [currentUser, setCurrentUser] = useState(null);
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
function handleUpdateUser(data){
  api.setUserInfo(data)
  .catch((err) => {
      console.log(err)
  },[]);
  closeAllPopups()
}

function handleUpdateAvatar(data){
  api.setUserAvatar(data)
  .catch((err) => {
      console.log(err)
  },[]);
  closeAllPopups()
}

React.useEffect(() => {
  api.getUserInfo().then((user) => {
    setCurrentUser(user)
  })
  .catch((err) => {
      console.log(err)
  },[]);
},[])




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

///card
const [cards, setCards] = useState([])
const [newCard, setnewCards] = useState([])
const handleRequest = () =>{
    api.getCards().then((data) => {

        setCards(data)
    }).catch((err) => {
        console.log(err)
    })
}
function handleCardLike(card) {
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
  });
  {isLiked ? document.querySelector('.element__heart').classList.remove('element__heart_active') : document.querySelector('.element__heart').classList.add('element__heart_active')}
}

function handleDeleteCard(card) {
api.deleteCard(card._id).then(() =>
{
  setCards((state) => state.filter( (st) => st.id !== card._id ))
})
}

function addCard(data){
  api.addCard(data).then((res)=>{
    {res.ok && setCards([newCard, ...data]); }
  })
  .catch((err) => {
      console.log(err)
  },[]);
  closeAllPopups()
}


function handleCardClick(name, link){
    setisImagePopupOpen(true)
    setselectedCard({name, link})
}

React.useEffect(() =>{
    handleRequest()
}, [])

    return (
       <userContext.Provider value={currentUser}>
    <div className="body">
    <div className="page">
        <Header />
        <Main onCardLike={handleCardLike} onCardDelete={handleDeleteCard} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} cards={cards}  onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick}/>
        <Footer/>

        <ImagePopup card={selectedCard} isOpen={isImagePopupOpen} onClose={closeAllPopups}/>
        <PopupWithForm name="delete" onClose={closeAllPopups}   namePopup="Вы уверены?" btn="delete-card" nameBtn="Да"  />
        <EditAvatarPopup  onUpdateAvatar={handleUpdateAvatar} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} />
        <EditProfilePopup onUpdateUser={handleUpdateUser} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} />
        <AddPlacePopup handleSubmit={addCard} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} />
    </div>

    </div>
    </userContext.Provider>
    );
}

export default App;