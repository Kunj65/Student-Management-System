const express = require("express");

const { db } = require("../connection");

async function createStudentModel() {

    await db.execute(`
        CREATE TABLE IF NOT EXISTS student_data (
            id INT AUTO_INCREMENT PRIMARY KEY,
            first_name VARCHAR(200) NOT NULL,
            last_name VARCHAR(200) NOT NULL,
            age INT NOT NULL,
            class INT NOT NULL
        )
    `);

}

module.exports = {
    createStudentModel,
};