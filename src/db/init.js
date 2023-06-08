const Database = require('./config')

const initDb = {

 async init(){

  const db = await Database()
  
  await db.exec(`
    CREATE TABLE profile (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    avatar TEXT,
    monthly_budget INT,
    days_per_week INT,
    hours_per_day INT,
    vacation_per_year INT,
    value_hour INT
   )
   `);
  
   await db.exec(`
    CREATE TABLE jobs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    daily_hours INT,
    total_hours INT,
    created_at DATETIME
   )
   `);
  
   await db.run(`
     INSERT INTO profile (
      name,
      avatar,
      monthly_budget,
      days_per_week,
      hours_per_day,
      vacation_per_year,
      value_hour
     ) VALUES (
      "Luis Felipe de Souza Bond",
      "https://avatars.githubusercontent.com/u/69223872?v=4",
      3000,
      5,
      8,
      4,
      50
     )
   `);
  
   await db.run(`
   INSERT INTO jobs (
    name,
    daily_hours,
    total_hours,
    created_at
   ) VALUES (
    "Pizzaria Guloso",  
    2,
    60,
    1686074789656
   )
  `);
  
  await db.run(`
   INSERT INTO jobs (
    name,
    daily_hours,
    total_hours,
    created_at
   ) VALUES (
    "OneTwo Project",  
    2,
    2,
    1686074789656
   )
  `);
  
   await db.close() 
 }
}

initDb.init()

