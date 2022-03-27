export class FormValidator {
	constructor (settings, form) {
		this._form = form;
		this._settings = settings;
		this._inputs = Array.from(this._form.querySelectorAll(this._settings.inputSelector));
		this._button = this._form.querySelector(this._settings.submitButtonSelector);
	}

	_hideErrorMessage(errorMessage, input) {
		errorMessage.textContent = "";
		input.classList.remove(this._settings.inputErrorClass);
		}

	_showErrorMessage(errorMessage, input) {
		errorMessage.textContent = input.validationMessage;
		input.classList.add(this._settings.inputErrorClass);
		}

	_checkInputValidity(input) {
		const errorMessage = this._form.querySelector (`#error-${input.id}`);
		if (input.validity.valid) {
			this._hideErrorMessage(errorMessage, input);
		}
		else {
			this._showErrorMessage(errorMessage, input);
		}
	}

	_hideDisabledButton() {
		this._button.removeAttribute('disabled');
		this._button.classList.remove(this._settings.inactiveButtonClass);
	}

	showDisabledButton() {
		this._button.setAttribute('disabled', true);
		this._button.classList.add(this._settings.inactiveButtonClass);
	}

	_checkButtonValidity() {
		if (this._form.checkValidity()) {
			this._hideDisabledButton();
		}
		else {
			this.showDisabledButton();
		}
	}

	_setEventListeners() {
	  this._inputs.forEach(input => {
	    input.addEventListener('input', (evt) => {
		  this._checkInputValidity(input);
		  this._checkButtonValidity();
		})
	  })
	}

	enableValidation() {
		this._form.addEventListener('submit', (evt) => {
			evt.preventDefault();
		})
		this._setEventListeners ();
	}

	resetErrors() {
		this._inputs.forEach((input) => {
          this._hideErrorMessage((this._form.querySelector (`#error-${input.id}`)), input);
		})
	}
}