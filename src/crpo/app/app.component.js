class AppCtrl {
  constructor () {
    this.url = 'http://hirepro.in'
    this.title = 'Hello from avnsh !'
  }
}
export const app = {
  controller: AppCtrl,
  controllerAs: 'app',
  template: require('./app.tpl.html')
}
