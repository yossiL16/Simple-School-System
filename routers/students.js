import express from 'express';
import {connection} from '../db.js'

const studentsRouter = express();



studentsRouter.post('/', async (req,res) => {
    const {name,age,className} = req.body;

    if(!name || age === undefined || className === undefined) {
        return res.status(400).json({error: "MISSING_FIELDS"}) ;
    }
    if(typeof age !== "number"){
        return res.status(400).json({error: "AGE_NOT_A_NUMBER"});
    }

    const result = await connection.query('INSERT INTO students (name, age, class_name) VALUES (?,?,?) ', [name, age,className]);
    let insertid = result[0].insertId
    res.status(201).json({id: insertid, name, age, className }) });



studentsRouter.get('/', async (req,res) => {
    try {
        const count = await connection.query("SELECT * FROM students");
        res.status(200).json({
            count: count[0].length,
            students: count[0]
        });
        console.log(count[0].length);
        
    } catch(err) {
        console.log(err);;
        res.status(500).json({error: "internal error"});
    };
});



studentsRouter.get('/:id',async (req,res) => {
    try{
        const id = req.params.id;
        if(!id){return res.status(400).json({err:"INVALID_ID"})};
        const students = await connection.query(`SELECT * FROM students WHERE id = ? LIMIT 1`, [id]);
        res.status(200).json(students[0]);

    } catch(err) {
        console.log(err);
        res.status(404).json({"error": "STUDENT_NOT_FOUND"});
    }
})



studentsRouter.put('/:id',async (req,res) => {
    const id = req.params.id;    
    const {name, age, className} = req.body;

     if(!name || age === undefined || className === undefined) {
        return res.status(400).json({error: "MISSING_FIELDS"}) 
    };

    if(!id){return res.status(400).json({error:"INVALID_ID"})};

    const somone = await connection.query(`SELECT * FROM students WHERE id = ? LIMIT 1`, [id]);

    if(somone[0].length < 1) {return res.status(404).json({ERROR: "student not found"})};

    await connection.query('UPDATE students SET name = ?, age = ?, class_name = ? WHERE id = ?', [name, age, className, id]);
    res.status(200).json({message: "resource updated successfully"});
})
    


studentsRouter.delete('/:id', async (req,res) => {
    const id = req.params.id;

    if(!id){return res.status(400).json({error:"INVALID_ID"})};

    const somone = await connection.query(`SELECT * FROM students WHERE id = ? LIMIT 1`, [id]);

    if(somone[0].length < 1) {return res.status(404).json({"error": "STUDENT_NOT_FOUND"})};

    await connection.query('DELETE FROM students WHERE id = ?', [id]);
    res.status(200).json({message: 'The deletion was successful.'});
});









export default studentsRouter