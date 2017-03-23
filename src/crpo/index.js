import angular from 'angular'
import angularMaterial from 'angular-material'

import { loadNg1Module } from '../bootstrap'
import { app } from './app/app.component'
import './style/style.css'

const globalAppModule = {
  components: {app},
  directives: {},
  services: {},
  states: [],
  configBlocks: [],
  runBlocks: []
}
const crpo = angular.module('app', [angularMaterial])

loadNg1Module(crpo, globalAppModule)
