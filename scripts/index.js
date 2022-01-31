//попап редактирования профиля
const editProfilePopupButton = document.querySelector('.profile__edit');
const popupEditProfile = document.querySelector('.popup_type_profile');
const popupCloseButton = document.querySelector('.popup__close');
const formElement = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');
const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__profession');

function editProfile() { 
  popupEditProfile.classList.add('popup_opened') 
  nameInput.value = nameProfile.textContent; 
  jobInput.value = jobProfile.textContent; 
} 

function closePopup() { 
  popupEditProfile.classList.remove('popup_opened') 
} 

function formSubmitHandler (evt) { 
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы. 
  nameProfile.textContent = nameInput.value; 
  jobProfile.textContent = jobInput.value; 
  closePopup(); 
} 
//попап добавления карточки
const addCardButton = document.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('.popup_type_add-card');
const popupAddCloseButton = document.querySelector('.popup__close_type_add-card');
const formAddCard = document.querySelector('.popup__form_type_add-card');
const cardNameInput = document.querySelector('.popup__input_type_card-name');
const ImgLinkInput = document.querySelector('.popup__input_type_img-link');
const cardSaveButton = document.querySelector('.popup__button_type_add-card')

function openPopupAddCard() {
  popupAddCard.classList.add('popup_opened');
}

function closePopupAddCard() {
  popupAddCard.classList.remove('popup_opened');
}

addCardButton.addEventListener('click', openPopupAddCard);
popupAddCloseButton.addEventListener('click', closePopupAddCard);

//массив первых 6 карточек
const popupImage =  document.querySelector('.popup-photo');
const imageInPopup = document.querySelector('.popup-photo__image');
const titleImagePopup = document.querySelector('.popup-photo__title');
const popupImageCloseButton = document.querySelector('.popup__close_type_photo');
const elements = document.querySelector('.elements');
const template = document.querySelector('.template').content;
const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ]; 

// функция создания карточки
function createCard(name, link) {
  const card = template.querySelector('.element').cloneNode(true);
  const cardTitle = card.querySelector('.element__title');
  const cardImage = card.querySelector('.element__photo');
  
  cardTitle.textContent = name;
  cardImage.alt = name;
  cardImage.src = link;
  
  const deleteCardButton = card.querySelector('.element__delete');
  const likeCardButton = card.querySelector('.element__like');
 
  deleteCardButton.addEventListener('click', deleteCard);
  likeCardButton.addEventListener('click', addLike);
  
  cardImage.addEventListener('click', function() {
    openPopupImage(popupImage);
    imageInPopup.src = cardImage.src;
    imageInPopup.alt = cardImage.alt;
    titleImagePopup.innerText = cardTitle.textContent;
  });
  return card;
}

// создание карточки из исходного массива
initialCards.forEach(function (el) {
  const card = createCard(el.name, el.link);
  elements.append(card);
});

// создание карточки из формы
function formSubmitNewCardHandler (evt) { 
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы. 
  const card = createCard(cardNameInput.value, ImgLinkInput.value);
  elements.prepend(card);
  closePopupAddCard(); 
} 

cardSaveButton.addEventListener('click', formSubmitNewCardHandler);

//добавление и удаление лайка
function addLike(el) {
  el.target.closest('.element__like').classList.toggle('element__like_add');
}

//удаление карточки
function deleteCard(el) {
  el.target.closest('.element').remove();
}

//открытие и закрытие попапа с изображением
function openPopupImage() {
  popupImage.classList.add('popup-photo_opened');
}

function closePopupImage() {
  popupImage.classList.remove('popup-photo_opened');
}

popupImageCloseButton.addEventListener('click', closePopupImage); 
editProfilePopupButton.addEventListener('click', editProfile); 
popupCloseButton.addEventListener('click', closePopup); 
formElement.addEventListener('submit', formSubmitHandler); 
formAddCard.addEventListener('submit', formSubmitNewCardHandler); 
