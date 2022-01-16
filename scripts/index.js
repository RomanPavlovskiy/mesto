const editProfilePopupButton = document.querySelector('.profile__edit');
const popup = document.querySelector('.popup');
const popupCloseButton = document.querySelector('.popup__close');
const likeButtons = document.querySelectorAll('.element__like');
const closeProfileButton = document.querySelector('.popup__button') 

function editProfile() {
    popup.classList.add('popup_opened')
}

function closePopup() {
    popup.classList.remove('popup_opened')
}

likeButtons.forEach ((el) =>
el.addEventListener('click', function () {
        el.classList.toggle('element__like_add');
    }
))

editProfilePopupButton.addEventListener('click', editProfile)
popupCloseButton.addEventListener('click', closePopup);
closeProfileButton.addEventListener('click', closePopup);




// Находим форму в DOM
let formElement = document.querySelector('.popup__form')// Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
let nameInput = document.querySelector('.popup__input_name')// Воспользуйтесь инструментом .querySelector()
let jobInput = document.querySelector('.popup__input_job')// Воспользуйтесь инструментом .querySelector()

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value
    let profileName = nameInput.value;
    let profileJob = jobInput.value; 
    // Выберите элементы, куда должны быть вставлены значения полей
    let nameProfile = document.querySelector('.profile__name');
    let jobProfile = document.querySelector('.profile__profession');
    // Вставьте новые значения с помощью textContent
    nameProfile.textContent = profileName;
    jobProfile.textContent = profileJob;
}
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler); 