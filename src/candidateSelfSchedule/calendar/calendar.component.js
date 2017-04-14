import moment from 'moment'

class CalendarCtrl {
  constructor(service) {
    const vm = this
    vm.moment = moment
    vm.page = {
      max: 0,
      min: 1,
      current: 1
    }
    service.apis.getSlots().then(function (slots) {
      vm.slots = slots
      vm.page.max = vm.slots.length
      console.log(vm.slots[vm.page.current])
    })
  }

  next() {
    this.page.current += 1
  }
  previous() {
    this.page.current -= 1
  }
}

export const calendar = {
  controller: CalendarCtrl,
  controllerAs: 'vm',
  template: require('./calendar.tpl.html')
}

