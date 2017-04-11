class HomeCtrl {
  constructor () {
    this.name = 'avi'
  }
}
export const home = {
  controller: HomeCtrl,
  controllerAs: 'home',
  template: `
    <h1>hello {{home.name}}</h1>
  `
}
