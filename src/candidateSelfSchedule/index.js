import angular from 'angular'
import angularMaterial from 'angular-material'
import 'angular-material/angular-material.css'

import { loadNg1Module } from '../bootstrap'
import { app } from './app.component'
import { calendar } from './calendar/calendar.component'
import { hello } from './hello/hello.component'
import { defaultTheme } from './theme.config'
import { service } from './service'

document.title = 'Pick a slot for your interview'

const globalAppModule = {
  components: { app, hello, calendar },
  // directives: {},
  services: { service },
  // states: [],
  configBlocks: [defaultTheme],
  // runBlocks: []
}
const verifyApp = angular.module('app', [angularMaterial])

loadNg1Module(verifyApp, globalAppModule)
