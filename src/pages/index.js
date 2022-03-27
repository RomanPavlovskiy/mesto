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
  elements,
  addCardButton,
  popupAddCloseButton,
  ValidationConfig,
  initialCards
} from '../utils/constants.js';

const section = new Section ({items: initialCards, renderer: (data) => {
  elements.append(createCard(data));
  }}, 
  '.elements');
section.renderItems();

const userInfo = new UserInfo({ profileNameSelestor:'.profile__name', profileJobSelctor: '.profile__profession' });
const imagePopup = new PopupWithImage('.popup_type_photo');
const profilePopup = new PopupWithForm('.popup_type_profile', handleProfileFormSubmit);
const addCardPopup = new PopupWithForm('.popup_type_add-card', handleNewCardFormSubmit);
imagePopup.setEventListeners();
profilePopup.setEventListeners();
addCardPopup.setEventListeners();

const EditProfileValidator = new FormValidator(ValidationConfig, formEditProfile);
const AddCardFormValidator = new FormValidator(ValidationConfig, formAddCard);
EditProfileValidator.enableValidation();
AddCardFormValidator.enableValidation();

function handleProfileFormSubmit(data) {
  const { name, description } = data;
  userInfo.setUserInfo(name, description);
  profilePopup.close();
}

function handleNewCardFormSubmit(data) {
  const newCard = createCard({
    name: data['place'],
    link: data['place-link']
  });
  section.addItem(newCard);
  addCardPopup.close();
}

function createCard(data) {
  const newCard = new Card(data, '.template', () => {
    imagePopup.open(data.name, data.link)
  }).createCard();
    return newCard;
};

addCardButton.addEventListener('click', () => {
  AddCardFormValidator.resetErrors();
  AddCardFormValidator.showDisabledButton();
  addCardPopup.open()
});
popupAddCloseButton.addEventListener('click', addCardPopup.close());

editProfilePopupButton.addEventListener('click', () => {
  EditProfileValidator.resetErrors();
  const { name, job } = userInfo.getUserInfo();
  nameInput.value = name;
  jobInput.value = job;
  profilePopup.open()
});
profilePopupCloseButton.addEventListener('click', profilePopup.close());



