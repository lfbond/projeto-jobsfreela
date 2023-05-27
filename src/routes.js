const express = require("express")
const routes = express.Router()

//const basePath = __dirname + "/views" (ejs já lê esse caminho, então pode se tirar ele)
const views = __dirname + "/views/" //o ejs lê o caminho views na rais e não na src.

const Profile = {
  data: {
    name: "Luís Felipe Bond",
    avatar: "https://avatars.githubusercontent.com/u/69223872?v=4",
    "monthly-budget": 8000,
    "days-per-week": 5,
    "hours-per-day": 8,
    "vacation-per-year":4,
    "value-hour": 50
   },

   controllers: {
    index(req, res) {
      return res.render(views + "profile", { profile: Profile.data })
    },

    update(req, res) {
        //req.body para pegar os dados
      const data = req.body
        //definir quantas semanas tem em um ano: 52
      const weeksPerYear = 52
        //remover as semanas de férias do ano, para pegar qts semanas tem no mês
      const weeksPerMonth = (weeksPerYear - data["vacation-per-year"]) / 12
        //total de horas por semana estou trabalhando
      const weekTotalHours = data["hours-per-day"] * data["days-per-week"]
        //horas trabalhadas no mês
      const monthlyTotalHours = weekTotalHours * weeksPerMonth
        //qual será o valor da minha hora
      const valueHour = data["monthly-budget"] / monthlyTotalHours

      Profile.data = {
        ...Profile.data,
        ...req.body,
        "value-hour": valueHour
      }
      return res.redirect('/profile')
    } 
   }
}

const Job = {
  data: [    
      {
        id: 1,
        name: "Pizzaria Guloso",
        "daily-hours": 2,
        "total-hours": 60,
        created_at: Date.now()
        //budget: 4500,
        //remaning: 3,
        //status: "progress"
      },
    
      {
        id: 2,
        name: "OneTwo Project",
        "daily-hours": 2,
        "total-hours": 4,
        created_at: Date.now()
        //budget: 4500,
        //remaning: 3,
        //status: "done"
      }    
  ],

  controllers: {
    index(req, res) {
        const updatedJobs = Job.data.map((job) => {
          //ajustes no job
          const remaining = Job.services.remainingDays(job)    
          const status = remaining <= 0 ? 'done' : 'progress'
      
          return {
            ...job,
            remaining,
            status,
            budget: Job.services.calculateBudget(job, Profile.data["value-hour"])
          }
        })
        return res.render(views + "index", {jobs: updatedJobs})      
    },

    create(req, res) {
      return res.render(views + "job")
    },

    save(req,res) {
      //req.body = {name: 'asdf', 'daily-hours': '3.1', 'total-hours': '3'}
      const lastId = Job.data[Job.data.length - 1]?.id || 0;
      Job.data.push({
        id: lastId + 1,
        name: req.body.name,
        "daily-hours": req.body["daily-hours"],
        "total-hours": req.body["total-hours"],
        created_at: Date.now() // atribuindo data de hoje

      })
      return res.redirect('/')
    },

    show(req, res) {

      const jobId = req.params.id

      const job = Job.data.find( job => Number(job.id) === Number(jobId) )

      if(!job) {
        return res.send("Job not Found")
      }

      job.budget = Job.services.calculateBudget(job, Profile.data["value-hour"])


      return res.render(views + "job-edit", { job })
    },

    update(req,res) {
      const jobId = req.params.id

      const job = Job.data.find( job => Number(job.id) === Number(jobId) )

      if(!job) {
        return res.send("Job not Found")
      }

      const updateJob = {
        ...job,
        name: req.body.name,
        "total-hours": req.body["total-hours"],
        "daily-hours": req.body["daily-hours"]
      }

      Job.data = Job.data.map( job => {

        if(Number(job.id) === Number(jobId))
        job = updateJob

        return job
      })

      res.redirect('/job/' + jobId)

    },

    delete(req, res) {
      const jobId = req.params.id

      Job.data = Job.data.filter(job => Number(job.id) !== Number(jobId))

      return res.redirect('/')
    }
    
  },

  services: {
    remainingDays (job){
      //calculo de tempo (dias) restante
      const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed()
      //data do dia que foi criado o projeto
      const createdDate = new Date(job.created_at)
      //qual o dia final do meu projeto
      const dueDay = createdDate.getDate() + Number(remainingDays)
      //data exata do vencimento
      const dueDateInMs = createdDate.setDate(dueDay)
      //tirar da data do futuro os numeros de dias que faltam baseado na data de hoje
      const timeDiffInMs = dueDateInMs - Date.now()
      //transformar millisecond em dias
      const dayInMs = 1000 * 60 * 60 * 24
      //diferença em dias
      const dayDiff = Math.floor(timeDiffInMs / dayInMs)
      //restam x dias
      return dayDiff
    },

    calculateBudget: (job, valueHour) => valueHour * job["total-hours"]
  }
}

//request, response
  //rota GET do index
routes.get('/', Job.controllers.index)
  //rota GET do create do job
routes.get('/job', Job.controllers.create)
  //rota POST do save do job
routes.post('/job', Job.controllers.save)
  //rota GET show do job-edit
routes.get('/job/:id', Job.controllers.show)
  //rota POST update do job-edit 
routes.post('/job/:id', Job.controllers.update)
  //rota POST delete do job-edit
routes.post('/job/delete/:id', Job.controllers.delete)
  //rota GET do index do profile
routes.get('/profile', Profile.controllers.index)
  // rota POST do profile
routes.post('/profile', Profile.controllers.update)

module.exports = routes;