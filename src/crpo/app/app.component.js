class AppCtrl {
  constructor () {
    this.url = 'http://hirepro.in'
    this.title = 'Hello from avnsh !'
    window.fetch('/py/common/get_tenant_details/', {
      method: 'POST',
      body: JSON.stringify({
        TenantAlias: 'crpodemo'
      })
    })
  }
}
export const app = {
  controller: AppCtrl,
  controllerAs: 'app',
  template: require('./app.tpl.html')
}
