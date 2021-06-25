import React,{useState,useEffect} from 'react';
import avatarEdit from '../../images/avatar-edit.svg';
import api from '../../utils/Api.js';
import Card from '../Card/Card.js'


 
 
 
function Main(props) { 
const [userName, setUserName] = useState(true)
const [userDescription, setuserDescription] = useState(true)
const [userAvatar, setUserAvatar] = useState(true)

React.useEffect(()=>{
    api.getUserInfo().then((user) => {
        setUserAvatar(user.avatar)
        setuserDescription(user.about)
        setUserName(user.name)
    
    })
    .catch((err) => {
        console.log(err)
    });

},[])



    return (    
<main className="content"> 
            <div className="profile"> 
 
                <img className="profile__avatar-edit" src={avatarEdit} onClick={props.onEditAvatar} /> 
                <img alt="Аватарка профиля" className="profile__avatar" style={{ backgroundImage: `url(${userAvatar})` }}  /> 
                <div className="profile__info"> 
                    <div className="profile__container"> 
                        <h1 className="profile__name">{userName}</h1> 
                        <button aria-label="Close" type="button" className="profile__btn-edit" onClick={props.onEditProfile}></button> 
                    </div> 
                    <p className="profile__status">{userDescription}</p> 
                </div> 
                <button className="profile__btn-add" onClick={props.onAddPlace}></button> 
            </div> 
            <div className="cards"> 
                <ul className="elements"> 
                {props.cards.map((item) => {
            return(
                <Card key={item._id} card={ {...item} }onCardClick={props.onCardClick}  />
            )
        })}
                </ul> 
            </div> 
        </main> 
    ); 
} 
 
export default Main; 