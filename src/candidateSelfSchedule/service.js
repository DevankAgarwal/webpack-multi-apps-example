import { assign, size, spread, chain } from 'lodash'
import moment from 'moment'

export function service($http, $window, $q) {
  const service = {
    constants: {
      slotDuration: 30,
      futureDays: 15,
      token: ''
    },
    apis: {
      getSlots: getSlots,
      getBasicInfo: getBasicInfo,
      schedule: schedule
    },
    urls: {
      getOpenSlots: '/py/crpo/api/v1/interview/getallinterviewerslots?token=',
      basicInfo: '/py/crpo/api/v1/interview/get/basicinfo?token=',
      schedule: '/py/crpo/api/v1/interview/schedulerequest?token='
    },
    common: {
      http: {
        post: post,
        get: get
      }
    }
  }
  const promises = {}
  return service

  function post(url, json, config) {
    const key = url + JSON.stringify(json)
    if (promises.hasOwnProperty(key)) {
      return promises[key]
    }
    promises[key] = $http.post(url, json, assign({}, config, {
      headers: {
        'T-Alias': service.constants.tenantAlias
      }
    })).then(res => {
      delete promises[key]
      return res.data
    })

    return promises[key]
  }

  function get(url) {
    const key = url;
    if (promises.hasOwnProperty(key)) {
      return promises[key]
    }
    promises[key] = $http.get(url, {
      headers: {
        'T-ALIAS': service.constants.tenantAlias
      }
    }).then(res => {
      delete promises[key]
      return res.data
    })

    return promises[key]
  }

  function getOpenSlots() {
    return get(service.urls.getOpenSlots + service.constants.token)
  }

  function schedule(request) {
    return post(service.urls.schedule + service.constants.token, request)
  }

  function getBasicInfo() {
    service.constants.token = $window.location.hash.split('/')[2].substr(1, $window.location.hash.split('/')[2].length)
    service.constants.tenantAlias = $window.location.hash.split('/')[1]
    return get(service.urls.basicInfo + service.constants.token).catch(function (res) {
      console.log(res)
    });
  }

  function getSlots() {
    var slots = [], savedSlots;
    return $q.all([
      getOpenSlots(),
      getBasicInfo()
    ]).then(spread(function (openSlots, basicInfo) {
      if (!openSlots || !openSlots.slots || !openSlots.slots.length) {
        return {
          slots: []
        }
      }
      var response = {}
      if (openSlots.engagedSlots && size(openSlots.engagedSlots)) {
        response.engaged = openSlots.engagedSlots[0]
      }
      savedSlots = chain(openSlots.slots).mapKeys('date').mapValues('times').value()
      for (let i = 0; i < (basicInfo.data.preferences.candidateSlotDays || service.constants.futureDays); i++) {
        slots.push({
          date: moment().add(i, 'days').format('DD-MM-YYYY'),
          times: savedSlots[moment().add(i, 'days').format('DD-MM-YYYY')]
        })
      }
      response.slots = chain(slots)
        .chunk(3)
        .map(chunk => chain(chunk).
          mapKeys('date').
          mapValues('times').
          value()
        )
        .value()
      response.canSchedule = basicInfo.data.canSchedule
      return response
    }))
  }
}