import express from 'express';
import mysql from 'mysql2/promise';
import { createrTable} from './db.js'
import studentsRouter from './routers/students.js'

const app = express();
app.use(express.json());


app.use("/students", studentsRouter);

createrTable()








app.listen(3000,() => {
    console.log('Server running on http://localhost:3000');   
})