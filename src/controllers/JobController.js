const Job = require('../model/Job')
const Profile = require('../model/Profile')
const JobUtils = require('../utils/JobUtils')

module.exports = {
 create(req, res) {
   return res.render("job")
 },

 async save(req,res) {

  /* const jobs = await Job.get();
  const lastId = jobs[jobs.length - 1]?.id || 0; */

  await Job.create(
    {
      /* id: lastId + 1, */
      name: req.body.name,
      "daily-hours": req.body["daily-hours"],
      "total-hours": req.body["total-hours"],
      created_at: Date.now() // atribuindo data de hoje
    }
  )

  return res.redirect('/')
 },

 async show(req, res) {
   const jobId = req.params.id
   const jobs = await Job.get()
   const profile = await Profile.get()
   const job = jobs.find( job => Number(job.id) === Number(jobId) )

   if(!job) {
     return res.send("Job not Found")
   }

   job.budget = JobUtils.calculateBudget(job, profile["value-hour"])
   return res.render("job-edit", { job })
 },

 async update(req, res) {
  const jobId = req.params.id

  const updatedJob = {
    name: req.body.name,
    "total-hours": req.body["total-hours"], 
    "daily-hours": req.body["daily-hours"], 
  }      

  await Job.update(updatedJob, jobId)
  res.redirect('/job/' + jobId)
},

 async delete(req, res) {
  const jobId = req.params.id
  await Job.delete(jobId)  
  return res.redirect('/')
}
}