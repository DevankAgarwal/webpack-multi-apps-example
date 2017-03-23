import angular from 'angular'
import angularMaterial from 'angular-material'

import '../style/app.css'

let app = () => {
  return {
    template: require('./app.html'),
    controller: 'AppCtrl',
    controllerAs: 'app'
  }
}

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

const MODULE_NAME = 'app'

angular.module(MODULE_NAME, [angularMaterial])
  .directive('app', app)
  .controller('AppCtrl', AppCtrl)

export default MODULE_NAME
