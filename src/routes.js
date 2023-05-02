const express = require("express")
const routes = express.Router()

//const basePath = __dirname + "/views" (ejs já lê esse caminho, então pode se tirar ele)
const views = __dirname + "/views/" //o ejs lê o caminho views na rais e não na src.

const profile = {
 name: "Luís Felipe Bond",
 avatar: "https://avatars.githubusercontent.com/u/69223872?v=4",
 "monthly-budget": 3000,
 "days-per-week": 5,
 "hours-per-day": 5,
 "vacation-per-year":4
}


//request, response
routes.get('/', (req, res) =>  res.render(views + "index", { profile }))
routes.get('/job', (req, res) =>  res.render(views + "job"))
routes.get('/job/edit', (req, res) =>  res.render(views + "job-edit"))
routes.get('/profile', (req, res) =>  res.render(views + "profile", { profile }))


module.exports = routes;