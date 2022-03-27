export class UserInfo {
  constructor ({ profileNameSelestor, profileJobSelctor }) {
    this._nameElement = document.querySelector(profileNameSelestor);
    this._jobElement = document.querySelector(profileJobSelctor);
  }
    
  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      job: this._jobElement.textContent
    }
  }

  setUserInfo(title, job) {
    this._nameElement.textContent = title;
    this._jobElement.textContent = job;
  }
}
