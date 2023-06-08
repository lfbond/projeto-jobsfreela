const Database = require('../db/config')



/* let data = {
  name: "Luís Felipe Bond",
  avatar: "https://avatars.githubusercontent.com/u/69223872?v=4",
  "monthly-budget": 8000,
  "days-per-week": 5,
  "hours-per-day": 8,
  "vacation-per-year":4,
  "value-hour": 50
} */

module.exports = {
 async get(){

  const db = await Database()

  const data = await db.get(` SELECT * FROM profile `)

  await db.close()

  
  //podemos normalizar todo o arquivo de "-" para "_" para que seja reconhecido pelo banco de dado e vice versa ou alterar em todo o projeto para "_".
  return {
    name: data.name,
    avatar: data.avatar,
    "monthly-budget": data.monthly_budget,
    "days-per-week": data.days_per_week,
    "hours-per-day": data.hours_per_day,
    "vacation-per-year": data.vacation_per_year,
    "value-hour": data.value_hour
  };
 },

 async update(newData){
  
  const db = await Database()

  db.run(`
    UPDATE profile SET 
    name = "${newData.name}",
    avatar = "${newData.avatar}",
    monthly_budget = ${newData["monthly-budget"]},
    days_per_week = ${newData["days-per-week"]},
    hours_per_day = ${newData["hours-per-day"]},
    vacation_per_year = ${newData["vacation-per-year"]},
    value_hour = ${newData["value-hour"]}
  `)

  await db.close()
  
 }
}