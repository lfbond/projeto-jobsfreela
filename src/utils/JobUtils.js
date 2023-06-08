module.exports = {
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