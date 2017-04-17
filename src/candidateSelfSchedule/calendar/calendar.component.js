import moment from 'moment'
import assign from 'lodash/assign'

class CalendarCtrl {
  constructor(service) {
    const vm = this
    vm.moment = moment
    vm.slotSelected = false
    vm.page = {
      max: 0,
      min: 1,
      current: 1
    };
    service.apis.getSlots().then(function (slots) {
      vm.slots = slots
      vm.page.max = vm.slots.length - 1
    })
  }

  next() {
    this.page.current += 1
  }

  previous() {
    this.page.current -= 1
  }

  confirm () {
    console.log(1)
  }

  selectSlot(date, slot) {
    this.slotSelected = true
    this.selectedSlot = assign({}, {
      date: date
    }, slot);
  }

  unSelectSlot() {
    this.slotSelected = false
    this.selectedSlot = undefined
  }
}

export const calendar = {
  controller: CalendarCtrl,
  controllerAs: 'vm',
  template: require('./calendar.tpl.html')
}

