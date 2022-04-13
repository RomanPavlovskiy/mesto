export class UserInfo {
  constructor ({ profileNameSelestor, profileJobSelctor, profileAvatarSelector }) {
    this._nameElement = document.querySelector(profileNameSelestor);
    this._jobElement = document.querySelector(profileJobSelctor);
    this._avatar = document.querySelector(profileAvatarSelector);
  }
    
  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      job: this._jobElement.textContent,
    }
  }

  setUserInfo(title, job, avatar) {
    this._nameElement.textContent = title;
    this._jobElement.textContent = job;
    this._avatar.src = avatar;
  }
}
