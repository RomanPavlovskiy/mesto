import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  open (name, link) {
    const image = this._popup.querySelector('.popup__photo');
    const title = this._popup.querySelector('.popup__photo-title');

    image.src = link
    title.textContent = name

    super.open()
  }
}