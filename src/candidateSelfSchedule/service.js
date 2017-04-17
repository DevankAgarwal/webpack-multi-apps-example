import _ from 'lodash'
import moment from 'moment'

export function service($http) {
  var service = {
    constants: {
      slotDuration: 30,
      futureDays: 15
    },
    apis: {
      getSlots: getSlots,
      getBasicInfo: getBasicInfo
    },
    urls: {
      getOpenSlots: '/py/crpo/api/v1/interview/getallinterviewerslots?',
      basicInfo: '/py/crpo/api/v1/interview/get/basicinfo?'
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
    return $http.post(url, json, config)
  }

  function get(url) {
    return $http.get(url, {
      headers: {
        'T-ALIAS': 'crpodemo'
      }
    }).then(res => res.data)
  }

  function getOpenSlots() {
    return get(service.urls.getOpenSlots + 'token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjYW5kaWRhdGVJZCI6MTExMzI2MCwic3RhZ2VJZCI6MjAwNTIsImpvYklkIjoyNjkzN30.TToaDzS0CNfOYZLaEqD8EPR3SUj02HG6IhxSW8Nzlyk');
  }

  function getBasicInfo() {
    return get(service.urls.basicInfo + 'token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjYW5kaWRhdGVJZCI6MTExMzI2MCwic3RhZ2VJZCI6MjAwNTIsImpvYklkIjoyNjkzN30.TToaDzS0CNfOYZLaEqD8EPR3SUj02HG6IhxSW8Nzlyk');
  }

  function getSlots() {
    var slots = [], savedSlots;
    return getOpenSlots().then(function (res) {
      savedSlots = _.chain(res.slots).mapKeys('date').mapValues('times').value()
      for (let i = 0; i < service.constants.futureDays; i++) {
        slots.push({
          date: moment().add(i, 'days').format('DD-MM-YYYY'),
          times: savedSlots[moment().add(i, 'days').format('DD-MM-YYYY')]
        });
      }
      return _.chain(slots)
        .chunk(3)
        .map(chunk => _.chain(chunk).
          mapKeys('date').
          mapValues('times').
          value()
        )
        .value();
    });
  }
}