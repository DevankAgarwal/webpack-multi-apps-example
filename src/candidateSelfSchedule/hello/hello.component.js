export const hello = {
  controller: HelloCtrl,
  controllerAs: 'vm',
  template: require('./hello.tpl.html')
}

class HelloCtrl {
  constructor () {
    this.name = 'Self Schedule app'
  }
}