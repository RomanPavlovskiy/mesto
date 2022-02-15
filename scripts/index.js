const profilePopup = document.querySelector('.popup');
const editProfilePopupButton = document.querySelector('.profile__edit');
const popupEditProfile = document.querySelector('.popup_type_profile');
const profilePopupCloseButton = document.querySelector('.popup__close_type_profile');
const formEditProfile = document.querySelector('.popup__form_type_profile');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');
const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__profession');

// функции открытия и закрытия попапа
function openPopup(profilePopup) {
  profilePopup.classList.add('popup_opened');
  profilePopup.addEventListener('click', closePopupOverlayClick);
  document.addEventListener('keydown', handleClosePopupEscape);
}

function closePopup(profilePopup) {
  profilePopup.classList.remove('popup_opened');
  profilePopup.removeEventListener('click', closePopupOverlayClick);
  document.removeEventListener('keydown', handleClosePopupEscape);
}

// функция закрытия попапа по Esc
const handleClosePopupEscape = function (evt) {
	if (evt.key === 'Escape') {
		closePopup(document.querySelector('.popup_opened'));
	}
}

// функция закрытия попапа по клику на оверлей
const closePopupOverlayClick = function (evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.target);
  };
};

//попап редактирования профиля
function editProfile() {
  openPopup(popupEditProfile)
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
}

function closeProfilePopup() {
  closePopup(popupEditProfile)
}

function handleProfileFormSubmit (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  closePopup(popupEditProfile);
}

//попап добавления карточки
const addCardButton = document.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('.popup_type_add-card');
const popupAddCloseButton = document.querySelector('.popup__close_type_add-card');
const formAddCard = document.querySelector('.popup__form_type_add-card');
const cardNameInput = document.querySelector('.popup__input_type_card-name');
const imgLinkInput = document.querySelector('.popup__input_type_img-link');
const cardSaveButton = document.querySelector('.popup__button_type_add-card');

function openPopupAddCard() {
  openPopup(popupAddCard);
}

function closePopupAddCard() {
  closePopup(popupAddCard);
}

addCardButton.addEventListener('click', openPopupAddCard);
popupAddCloseButton.addEventListener('click', closePopupAddCard);

//массив первых 6 карточек
const popupImage =  document.querySelector('.popup_type_photo');
const imageInPopup = document.querySelector('.popup__photo');
const titleImagePopup = document.querySelector('.popup__photo-title');
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
function handleNewCardFormSubmit (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  const card = createCard(cardNameInput.value, imgLinkInput.value);
  elements.prepend(card);
  closePopupAddCard();
  cardNameInput.value = "";
  imgLinkInput.value = "";
  disableButtonAfterNewCard();

}

// отключение кнопки после создания новой карточки
function disableButtonAfterNewCard () {
  cardSaveButton.setAttribute('disabled', "");
  cardSaveButton.classList.add('popup__button_disabled');
}

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
  openPopup(popupImage);
}

function closePopupImage() {
  closePopup(popupImage);
}

popupImageCloseButton.addEventListener('click', closePopupImage);
editProfilePopupButton.addEventListener('click', editProfile);
profilePopupCloseButton.addEventListener('click', closeProfilePopup);
formEditProfile.addEventListener('submit', handleProfileFormSubmit);
formAddCard.addEventListener('submit', handleNewCardFormSubmit);

