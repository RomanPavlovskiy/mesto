//отменяем отправку формы
const handleFormSubmit = (evt, form) => {
  evt.preventDefault();
}

//спрятать сообщение об ошибке
const hideErrorMessage = (inputErrorClass, errorMessage, input) => {
  errorMessage.textContent = "";
  input.classList.remove(inputErrorClass);
}

//показать сообщение об ошибке
const showErrorMessage = (inputErrorClass, errorMessage, input) => {
  errorMessage.textContent = input.validationMessage;
  input.classList.add(inputErrorClass);
}

//проверка валидации
const checkInputValidity = ({inputErrorClass}, form, input) => {
  const errorMessage = form.querySelector (`#error-${input.id}`);
  if (input.validity.valid) {
    hideErrorMessage(inputErrorClass, errorMessage, input);
  }
  else {
    showErrorMessage(inputErrorClass, errorMessage, input);
  }
}

//спрятать неактивную кнопку
const hideDisabledButton = (inactiveButtonClass, button) => {
  button.removeAttribute('disabled');
  button.classList.remove(inactiveButtonClass);
}

//показать неактивную кнопку
const showDisabledButton = (inactiveButtonClass, button) => {
  button.setAttribute('disabled', "");
  button.classList.add(inactiveButtonClass);
}

//реакция кнопки на валидацию
const checkButtonValidity = ({inactiveButtonClass}, form, button) => {
  if (form.checkValidity()) {
    hideDisabledButton(inactiveButtonClass, button);
  }
  else {
    showDisabledButton(inactiveButtonClass, button);
  }
}

function enableValidation ({formSelector, inputSelector, submitButtonSelector, ...rest}) {
  const form = document.querySelector(formSelector);
  const forms = Array.from(document.querySelectorAll(formSelector));
  forms.forEach((form) => {
    form.addEventListener('submit', (evt) => handleFormSubmit(evt, form));
    
  const inputs = form.querySelectorAll(inputSelector);
  const button = form.querySelector(submitButtonSelector);

  form.addEventListener('reset', () => {
    disableButton(button, rest);
  })

  checkButtonValidity(rest, form, button);

  inputs.forEach(input => {
    input.addEventListener('input', (evt) => {
      checkInputValidity(rest, form, input);
      checkButtonValidity(rest, form, button);
    })
    })
  })
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
})