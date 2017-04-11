import angular from 'angular'
import { app } from './app/app.component'
import { appService } from './app/app.svc'
import { loadNg1Module } from '../bootstrap'

const globalAppModule = {
  components: {app},
  services: {appService}
}

const crpo = angular.module('app')

loadNg1Module(crpo, globalAppModule)
