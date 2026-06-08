const { db } = require("../connection");

async function createUserTable() {

    try {

        await db.execute(`
        
            CREATE TABLE IF NOT EXISTS users (
            
                id INT AUTO_INCREMENT PRIMARY KEY,

                username VARCHAR(200) NOT NULL,

                email VARCHAR(200) NOT NULL UNIQUE,

                password VARCHAR(255) NOT NULL
            )
        
        `);
    } catch (error) {

        console.log(error);

    }
}

module.exports = {
    createUserTable
};