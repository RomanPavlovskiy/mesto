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
  updateProfileAvatarButton,
  formUpdateAvatar,
  validationConfig,
} from '../utils/constants.js';
import { api } from '../components/Api.js';

let userId

//берем данные профиля и карточек с сервера и отображаем на странице

Promise.all([api.getProfile(), api.getInitialCards()])
  .then(([user, cardList]) => {
    userId = user._id
    userInfo.setUserInfo(user.name, user.about, user.avatar)

    const cardListReversed = cardList.reverse()
    cardListReversed.forEach(data => {
      const newCard = createCard({
        name: data.name,
        link: data.link,
        likes: data.likes,
        id: data._id,
        userId: userId,
        ownerId: data.owner._id
        })
      section.addItem(newCard)
    })
  })
  .catch((err) => {
    console.log(err);
  })
  
const section = new Section ({
  items: [], 
  renderer: (data) => {
  section.addItem(createCard(data));
  }}, 
  '.elements');
section.renderItems();

//создаем экземпляры попапов

const userInfo = new UserInfo({ profileNameSelestor:'.profile__name', profileJobSelctor: '.profile__profession', profileAvatarSelector: '.profile__avatar' });
const imagePopup = new PopupWithImage('.popup_type_photo');
const profilePopup = new PopupWithForm('.popup_type_profile', handleProfileFormSubmit);
const addCardPopup = new PopupWithForm('.popup_type_add-card', handleNewCardFormSubmit);
const confirmDeletePopup = new PopupWithForm('.popup_type_delete-confirm', () => {
  api.deleteCard(id)
});
const avatarPopup = new PopupWithForm('.popup_type_avatar', handleAvatarFormSubmit);

imagePopup.setEventListeners();
profilePopup.setEventListeners();
addCardPopup.setEventListeners();
confirmDeletePopup.setEventListeners();
avatarPopup.setEventListeners();

//создаем экземпляры классов валидации для форм

const editProfileValidator = new FormValidator(validationConfig, formEditProfile);
const addCardFormValidator = new FormValidator(validationConfig, formAddCard);
const avatarPopupValidator = new FormValidator(validationConfig, formUpdateAvatar);
editProfileValidator.enableValidation();
addCardFormValidator.enableValidation();
avatarPopupValidator.enableValidation();

//обрабатываем сабмит обновления аватара

function handleAvatarFormSubmit(data) {
  avatarPopup.renderLoading(true)
  api.updateAvatar(data['avatar'])
  .then(res => {
    userInfo.setUserInfo(res.name, res.about, res.avatar)
    avatarPopup.close()
  })
  .catch((err) => {
    console.log(err)
  }) 
  .finally(() => {
    avatarPopup.renderLoading(false)
  })
}

//обрабатываем сабмит обновления данных профиля

function handleProfileFormSubmit(data) {
  profilePopup.renderLoading(true)
  const { name, description } = data;
  api.editProfile(name, description)
    .then(res => {
      userInfo.setUserInfo(res.name, res.about, res.avatar);
      profilePopup.close();
    })
    .catch((err) => {
      console.log(err)
    }) 
    .finally(() => {
      profilePopup.renderLoading(false)
    })
}

//обрабатываем сабмит добавления карточки

function handleNewCardFormSubmit(data) {
  addCardPopup.renderLoading(true)
  api.addCard(data['place'], data['place-link'])
  .then(res => {
    const newCard = createCard({
      name: res.name,
      link: res.link,
      likes: res.likes,
      id: res._id,
      userId: userId,
      ownerId: res.owner._id
    })
    section.addItem(newCard);
    addCardPopup.close();
  })
  .catch((err) => {
    console.log(err)
  }) 
  .finally(() => {
    addCardPopup.renderLoading(false)
  })
}

//новая карточка

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
        .catch((err) => {
        console.log(err)
        })
      })
    },
    (id) => {
      if (newCard.isLiked()) {
        api.deleteLike(id)
        .then(res => {
         newCard.setLikes(res.likes)
       })
       .catch((err) => {
        console.log(err)
       })
      } else {
        api.addLike(id)
        .then(res => {
        newCard.setLikes(res.likes)
        })
        .catch((err) => {
          console.log(err)
        })
      }
    }
  );
    return newCard.generateCard();
}

//навешиваем слушатели 

updateProfileAvatarButton.addEventListener('click', () => {
  avatarPopupValidator.showDisabledButton();
  avatarPopup.open()
})

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