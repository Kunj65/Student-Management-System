const express = require("express");
const { db } = require("../connection");

async function handleGetStudent(req,res){

    try {

        const [rows] = await db.execute(
            "SELECT * FROM student_data"
        );

        return res.status(200).json({
            status: true,
            message: "Student Data Fetched",
            data: rows
        });

    } catch (error) {

        return res.status(500).json({
            status: false,
            message: "Failed to Fetch Students data",
            data: null,
            error: error.message
        });
    }
}

async function handleFetchStudentWithName(req, res) {

    try {
        
        const name = req.params.first_name;

        const [students] = await db.execute(
            `SELECT * FROM student_data WHERE first_name  = ?;`,
            [name]
        );

        if (students.length === 0) {

            return res.status(404).json({
                status: false,
                message: "No Student Found ",
                data: null
            });

        }

        return res.status(200).json({
            status: true,
            message: "Student Data Fetched",
            data: students
        });

    } catch (error) {

        return res.status(500).json({
            status: false,
            message: "Failed to Fetch Student data",
            data: null,
            error: error.message
        });

    }
}
async function handleStudentOrderByAge(req, res) {

        try {

            const [rows] = await db.execute(
                `SELECT * FROM student_data ORDER BY age ASC`
            );

            if (rows.length === 0) {

                return res.status(404).json({
                    status: false,
                    message: "No Students Found 1",
                    data: []
                });

            }

            return res.status(200).json({
                status: true,
                message: "Student Data Fetched",
                data: rows
            });

        } catch (error) {

            return res.status(500).json({
                status: false,
                message: "Failed to Fetch Students Data",
                data: null,
                error: error.message
            });

        }
}   

async function handleCreateNewStudent(req, res) {

    try {   

        const body = req.body;

        if (
            !body.first_name ||
            !body.last_name ||
            !body.age ||
            !body.class
        ) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
                data: null
            });
        }

        const [result] = await db.execute(
            `INSERT INTO student_data
            (first_name, last_name, age, class)
            VALUES (?, ?, ?, ?)`,
            [
                body.first_name,
                body.last_name,
                body.age,
                body.class
            ]
        );
        const [student] = await db.execute(
            `SELECT * FROM student_data WHERE id = ?`,
            [result.insertId]
        );

        return res.status(201).json({
            success: true,
            message: "Student Created Successfully",
            data: student[0] 
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: "Failed to create student",
            data: null,
            error: error.message
        });
    }
}
async function handlePartialUpdateStudent(req, res) {

    try {

        const body = req.body;
        const id = req.params.id;

        let updateFields = [];
        let values = [];

        // Dynamic field checks

        if (body.age !== undefined) {

            updateFields.push("age = ?");
            values.push(body.age);

        }

        if (body.class !== undefined) {

            updateFields.push("class = ?");
            values.push(body.class);

        }

        // No fields sent

        if (updateFields.length === 0) {

            return res.status(400).json({

                success: false,
                message: "No fields provided for update"

            });

        }

        // Final query

        const query = `
            UPDATE student_data
            SET ${updateFields.join(", ")}
            WHERE id = ?
        `;

        values.push(id);

        const [result] = await db.execute(query, values);

        // Student not found

        if (result.affectedRows === 0) {

            return res.status(404).json({

                success: false,
                message: "Student not found"

            });

        }

        // Fetch updated student

        const [student] = await db.execute(

            `SELECT * FROM student_data WHERE id = ?`,

            [id]

        );

        return res.status(200).json({

            success: true,
            message: "Student updated successfully",
            data: student[0]

        });

    } catch (error) {

        return res.status(500).json({

            success: false,
            message: "Failed to update student",
            error: error.message

        });

    }
}

async function handleUpdateStudent(req, res) { 
    try {
        const body = req.body;
        const id = req.params.id;
        const [result] = await db.execute(
            `UPDATE student_data
            SET first_name = ?, 
                last_name = ?, 
                age = ?, 
                class = ?
            WHERE id = ?`,
            [
                body.first_name,
                body.last_name,
                body.age,
                body.class,
                id
            ]
        );
        const [student] = await db.execute(
                `SELECT * FROM student_data WHERE id = ?`,
                [id]
            );
        return res.status(201).json({
                success: true,
                message: "Student updated Successfully",
                data: student[0]
            });
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to Update student",
            data: null,
            error: error.message
        });
    }
}

async function handleGetUserById(req,res) {

    try {

        const id = req.params.id;

        const [student] = await db.execute(
            `SELECT * FROM student_data WHERE id = ?`,
            [id]
        );

        // If no student found
        if (student.length === 0) {

            return res.status(404).json({
                status: false,
                message: "No Student Found ",
                data: null
            });
        }

        return res.status(200).json({
            status: true,
            message: "Student Data Fetched",
            data: student[0]
        });

    } catch (error) {

        return res.status(500).json({
            status: false,
            message: "Failed to Fetch Student data",
            data: null,
            error: error.message
        });
    }
}


async function handleDeleteStudent(req,res) {

    try {

        const id = req.params.id;

        const [result] = await db.execute(
            `DELETE FROM student_data WHERE id = ?`,
            [id]
        );

        // Check if student exists
        if (result.affectedRows === 0) {

            return res.status(404).json({
                success: false,
                message: "No Student Found",
                data: null
            });
        }

        return res.status(200).json({
            success: true,
            message: "Student Data Deleted Successfully",
            data: {
                deletedId: id
            }
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: "Failed to Delete Student",
            error: error.message
        });
    }
}


module.exports = {
    handleGetStudent,
    handleCreateNewStudent,
    handleUpdateStudent,
    handleDeleteStudent,
    handleFetchStudentWithName,
    handleGetUserById,
    handleStudentOrderByAge,
    handlePartialUpdateStudent

}