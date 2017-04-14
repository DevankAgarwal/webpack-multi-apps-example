class AppCtrl {
  constructor() {
    this.name = 'Self Schedule app'
  }
}

export const app = {
  controller: AppCtrl,
  controllerAs: 'app',
  template: require('./app.tpl.html')
}
