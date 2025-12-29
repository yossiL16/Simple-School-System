import mysql from 'mysql2/promise';

export const connection = await mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '1234554321',
    database: "school_db",
    port: 3306,
});

export async function createrTable(){

    await connection.query(
        `CREATE TABLE IF NOT EXISTS students (
         id INT AUTO_INCREMENT PRIMARY KEY, 
         name VARCHAR(100) NOT NULL,
         age INT NOT NUlL,
         class_name VARCHAR(20) NOT NULL)`
    )
    // console.log("The table create");

}