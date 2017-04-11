import angular from 'angular'
import angularMaterial from 'angular-material'
import 'angular-material/angular-material.css'

import { loadNg1Module } from '../bootstrap'
import { app } from './app/app.component'
import { home } from './app/home.component'
import './style/style.css'

document.title = 'CRPO'

const globalAppModule = {
  components: {app, home},
  directives: {},
  services: {},
  states: [],
  configBlocks: [],
  runBlocks: []
}
const crpo = angular.module('app', [angularMaterial])

loadNg1Module(crpo, globalAppModule)
