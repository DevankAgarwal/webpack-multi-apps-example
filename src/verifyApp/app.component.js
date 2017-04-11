class AppCtrl {
  constructor () {
    this.phoneWithUs = '888****818'
  }
  sendOtp () {
    this.otpSent = true
  }
  confirmOtp () {
    this.isConfirmed = true
  }
}

export const app = {
  controller: AppCtrl,
  controllerAs: 'app',
  template: require('./app.tpl.html')
}
