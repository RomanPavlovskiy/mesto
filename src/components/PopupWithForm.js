import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor (popupSelector, handleSubmit) {
  super(popupSelector);
  this._handleSubmit = handleSubmit;
  this._form = this._popup.querySelector('.popup__form');
  this._inputs = [...this._form.querySelectorAll('.popup__input')];
  this._formButton = this._form.querySelector('.popup__button');
  }

  _getInputValues() {
    const values = {}
    this._inputs.forEach((input) => {
      values[input.name] = input.value
    })
    return values;
  }

  changeSubmitHandler(newHandleSubmit) {
    this._handleSubmit = newHandleSubmit
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault()
      this._handleSubmit(this._getInputValues())
    })
  }

  close() {
    super.close();
    this._form.reset();
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._formButton.textContent = 'Сохранение...';
    } else {
      this._formButton.textContent = 'Сохранить';
    }
  }
}