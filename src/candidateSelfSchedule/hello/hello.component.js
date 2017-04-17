class HelloCtrl {
  constructor(service) {
    var vm = this;
    service.apis.getBasicInfo().then(function (res) {
      vm.basicInfo = res.data;
    });
  }
}

export const hello = {
  controller: HelloCtrl,
  controllerAs: 'vm',
  template: require('./hello.tpl.html')
}
