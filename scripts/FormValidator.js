export class FormValidator {
	constructor (settings, form) {
		this._form = form;
		this._settings = settings;
		this._inputs = Array.from(this._form.querySelectorAll(this._settings.inputSelector));
	}

	_hideErrorMessage (errorMessage, input) {
		errorMessage.textContent = "";
		input.classList.remove(this._settings.inputErrorClass);
		}

	_showErrorMessage (errorMessage, input) {
		errorMessage.textContent = input.validationMessage;
		input.classList.add(this._settings.inputErrorClass);
		}

	_checkInputValidity (input) {
		const errorMessage = this._form.querySelector (`#error-${input.id}`);
		if (input.validity.valid) {
			this._hideErrorMessage(errorMessage, input);
		}
		else {
			this._showErrorMessage(errorMessage, input);
		}
	}

	_hideDisabledButton (button) {
		button.removeAttribute('disabled');
		button.classList.remove(this._settings.inactiveButtonClass);
	}

	_showDisabledButton (button) {
		button.setAttribute('disabled', "");
		button.classList.add(this._settings.inactiveButtonClass);
	}

	_checkButtonValidity (button) {
		if (this._form.checkValidity()) {
			this._hideDisabledButton(button);
		}
		else {
			this._showDisabledButton(button);
		}
	}

	_setEventListeners () {
		const button = this._form.querySelector(this._settings.submitButtonSelector);

		this._inputs.forEach(input => {
			input.addEventListener('input', (evt) => {
				this._checkInputValidity(input);
				this._checkButtonValidity(button);
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