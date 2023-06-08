const Job = require('../model/Job')
const Profile = require('../model/Profile')
const JobUtils = require('../utils/JobUtils')

module.exports = {

 async index(req, res) {
 
  const jobs = await Job.get();
  const profile = await Profile.get();

  let statusCount = {
    progress: 0,
    done: 0,
    total: jobs.length
  }

  //total de horas por dia de cada Job em Progress
  let jobTotalHours = 0
 
  const updatedJobs = jobs.map((job) => {
    //ajustes no job
    const remaining = JobUtils.remainingDays(job)
    const status = remaining <= 0 ? 'done' : 'progress'

    // somando a quantidade de estatus
    statusCount[status] += 1

    //total de horas por dia de cada Job em Progress
    jobTotalHours = status == 'progress' ? jobTotalHours + Number(job['daily-hours']) : jobTotalHours // forma mais simplificada

    /* if(status == 'progress') {
      jobTotalHours += Number(job['daily-hours'])
    } */ //forma menos simplificada
 
    return {
      ...job,
      remaining,
      status,
      budget: JobUtils.calculateBudget(job, profile["value-hour"])
    }
  })

  // qtd que quero trabalhar - a qtd de horas por dia (PROFILE) de cada Job em Progress  
  const freeHours = profile["hours-per-day"] - jobTotalHours



  return res.render("index", {jobs: updatedJobs, profile: profile, statusCount: statusCount, freeHours: freeHours})
 }
}