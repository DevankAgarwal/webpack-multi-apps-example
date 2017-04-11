import angular from 'angular'
import angularMaterial from 'angular-material'
import 'angular-material/angular-material.css'

import { loadNg1Module } from '../bootstrap'
import { app } from './app.component'

document.title = 'Please Verify Yourself'

const globalAppModule = {
  components: {app}
  // directives: {},
  // services: {},
  // states: [],
  // configBlocks: [],
  // runBlocks: []
}
const verifyApp = angular.module('app', [angularMaterial])

loadNg1Module(verifyApp, globalAppModule)
