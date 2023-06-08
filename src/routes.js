const express = require("express")
const routes = express.Router()
const ProfileController = require("./controllers/ProfileController")
const JobController = require("./controllers/JobController")
const DashboardController = require("./controllers/DashboardController")

//const basePath = __dirname + "/views" (ejs já lê esse caminho, então pode se tirar ele)
//const views = __dirname + "/views/" //o ejs lê o caminho views na rais e não na src. foi MOVIDA para o SERVER.

//request, response
  //rota GET do index
routes.get('/', DashboardController.index)
  //rota GET do create do job
routes.get('/job', JobController.create)
  //rota POST do save do job
routes.post('/job', JobController.save)
  //rota GET show do job-edit
routes.get('/job/:id', JobController.show)
  //rota POST update do job-edit 
routes.post('/job/:id', JobController.update)
  //rota POST delete do job-edit
routes.post('/job/delete/:id', JobController.delete)
  //rota GET do index do profile
routes.get('/profile', ProfileController.index)
  // rota POST do profile
routes.post('/profile', ProfileController.update)

module.exports = routes;