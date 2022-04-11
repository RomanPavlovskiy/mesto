import './index.css'
import { FormValidator } from '../components/FormValidator.js';
import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import {
  editProfilePopupButton,
  profilePopupCloseButton,
  formEditProfile,
  formAddCard,
  nameInput,
  jobInput,
  addCardButton,
  popupAddCloseButton,
  ValidationConfig,
} from '../utils/constants.js';
import { api } from '../components/Api.js';

api.getProfile()
  .then(res => {
    userInfo.setUserInfo(res.name, res.about)
  })

api.getInitialCards()
  .then(cardList => {
    cardList.forEach(data => {
      const newCard = createCard({
        name: data.name,
        link: data.link,
        likes: data.likes,
        id: data._id
    })
    section.addItem(newCard)
  })
})

const section = new Section ({
  items: [], 
  renderer: (data) => {
  section.addItem(createCard(data));
  }}, 
  '.elements');
section.renderItems();

const userInfo = new UserInfo({ profileNameSelestor:'.profile__name', profileJobSelctor: '.profile__profession' });
const imagePopup = new PopupWithImage('.popup_type_photo');
const profilePopup = new PopupWithForm('.popup_type_profile', handleProfileFormSubmit);
const addCardPopup = new PopupWithForm('.popup_type_add-card', handleNewCardFormSubmit);
const confirmDeletePopup = new PopupWithForm('.popup_type_delete-confirm', () => {
  api.deleteCard(id)
});
imagePopup.setEventListeners();
profilePopup.setEventListeners();
addCardPopup.setEventListeners();
confirmDeletePopup.setEventListeners();


const editProfileValidator = new FormValidator(ValidationConfig, formEditProfile);
const addCardFormValidator = new FormValidator(ValidationConfig, formAddCard);
editProfileValidator.enableValidation();
addCardFormValidator.enableValidation();

function handleProfileFormSubmit(data) {
  const { name, description } = data;
  api.editProfile(name, description)
    .then(res => {
      userInfo.setUserInfo(res.name, res.about);
      profilePopup.close();
    })
}

function handleNewCardFormSubmit(data) {
  api.addCard(data['place'], data['place-link'])
  .then(res => {
    const newCard = createCard({
      name: res.name,
      link: res.link,
      likes: res.likes,
      id: res._id
    })
    section.addItem(newCard);
    addCardPopup.close();
  })
}

function createCard(data) {
  const newCard = new Card(data, 
    '.template', 
    () => {
    imagePopup.open(data.name, data.link)
    },
    (id) => {
      confirmDeletePopup.open(id)
      confirmDeletePopup.changeSubmitHandler(() => {
        api.deleteCard(id)
        .then(res => {
          confirmDeletePopup.close()
          newCard.deleteCard()
        })
      })
    }
  ).createCard();
    return newCard;
};

addCardButton.addEventListener('click', () => {
  addCardFormValidator.resetErrors();
  addCardFormValidator.showDisabledButton();
  addCardPopup.open()
});
popupAddCloseButton.addEventListener('click', addCardPopup.close());

editProfilePopupButton.addEventListener('click', () => {
  editProfileValidator.resetErrors();
  const { name, job } = userInfo.getUserInfo();
  nameInput.value = name;
  jobInput.value = job;
  profilePopup.open()
});
profilePopupCloseButton.addEventListener('click', profilePopup.close());