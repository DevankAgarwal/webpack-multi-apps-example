import _ from 'lodash'
import moment from 'moment'

export function service($http, $window) {
  var service = {
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
  };
  return service;

  function post(url, json, config) {
    return $http.post(url, json, _.assign({}, config, {
      headers: {
        'T-Alias': service.constants.tenantAlias
      }
    })).then(res => res.data)
  }

  function get(url) {
    return $http.get(url, {
      headers: {
        'T-ALIAS': service.constants.tenantAlias
      }
    }).then(res => res.data)
  }

  function getOpenSlots() {
    return get(service.urls.getOpenSlots + service.constants.token);
  }

  function schedule(request) {
    return post(service.urls.schedule + service.constants.token, request);
  }

  function getBasicInfo() {
    service.constants.token = $window.location.hash.split('/')[2].substr(1, $window.location.hash.split('/')[2].length)
    service.constants.tenantAlias = $window.location.hash.split('/')[1]
    return get(service.urls.basicInfo + service.constants.token).catch(function (res) {
      console.log(res);
    });
  }

  function getSlots() {
    var slots = [], savedSlots;
    return getOpenSlots().then(function (res) {
      if (!res || !res.slots || !res.slots.length) {
        return {
          slots: []
        }
      }
      var response = {}
      if (res.engagedSlots && _.size(res.engagedSlots)) {
        response.engaged = res.engagedSlots[0]
      }
      savedSlots = _.chain(res.slots).mapKeys('date').mapValues('times').value()
      for (let i = 0; i < service.constants.futureDays; i++) {
        slots.push({
          date: moment().add(i, 'days').format('DD-MM-YYYY'),
          times: savedSlots[moment().add(i, 'days').format('DD-MM-YYYY')]
        });
      }
      response.slots = _.chain(slots)
        .chunk(3)
        .map(chunk => _.chain(chunk).
          mapKeys('date').
          mapValues('times').
          value()
        )
        .value()
      return response
    });
  }
}