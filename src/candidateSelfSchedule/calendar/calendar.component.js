import moment from 'moment'
import assign from 'lodash/assign'

class CalendarCtrl {
  constructor(service) {
    const vm = this
    vm.moment = moment
    vm.slotSelected = false
    vm.alreadyScheduled = false;
    vm.service = service
    vm.page = {
      max: 0,
      min: 1,
      current: 0
    };
    service.apis.getSlots().then(function (res) {
      if (res.engaged) {
        vm.alreadyScheduled = true;
        vm.scheduledSlot = res.engaged
      } else {
        vm.slotsAvailable = res.slots.length
        vm.slots = res.slots
        vm.page.max = vm.slots.length - 1
      }
    })
  }

  next() {
    this.page.current += 1
  }

  previous() {
    this.page.current -= 1
  }

  confirm() {
    return this.service.apis.schedule({
      date: this.selectedSlot.date,
      time: this.selectedSlot.fromTime
    }).then((res) => {
      if (res && res.statusId === 200) {
        this.scheduled = true;
      }
    });
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

  // changeSlot() {
  //   this.service.apis.getSlots().then((res) => {
  //     debugger
  //     this.alreadyScheduled = false;
  //     this.slotsAvailable = res.slots.length
  //     this.slots = res.slots
  //     this.page.max = this.slots.length - 1
  //   })
  // }
}

export const calendar = {
  controller: CalendarCtrl,
  controllerAs: 'vm',
  template: require('./calendar.tpl.html')
}

