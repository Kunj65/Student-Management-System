const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const { db } = require("../connection");

// SIGNUP

async function handleUserSignup(req, res) {

    try {

        const {
            username,
            email,
            password
        } = req.body;

        if (
            !username ||
            !email ||
            !password
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "All fields are required"

            });

        }

        const hashedPassword =
            await bcrypt.hash(password, 10);

        await db.execute(

            `INSERT INTO users
             (username, email, password)
             VALUES (?, ?, ?)`,

            [
                username,
                email,
                hashedPassword
            ]

        );

        return res.status(201).json({

            success: true,

            message:
                "User Created Successfully"

        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({

            success: false,

            message:
                "Signup Failed"

        });

    }

}


// LOGIN

async function handleUserLogin(req, res) {

    try {

        const {
            email,
            password
        } = req.body;

        const [users] = await db.execute(

            `SELECT * FROM users
             WHERE email = ?`,

            [email]

        );

        if (users.length === 0) {

            return res.status(404).json({

                success: false,

                message:
                    "User Not Found"

            });

        }

        const user = users[0];

        const isMatch =
            await bcrypt.compare(

                password,

                user.password

            );

        if (!isMatch) {

            return res.status(401).json({

                success: false,

                message:
                    "Invalid Password"

            });

        }

        const token = jwt.sign(

            {
                id: user.id,
                email: user.email
            },

            process.env.JWT_SECRET,

            {
                expiresIn: "1h"
            }

        );

        res.cookie(

            "token",

            token,

            {
                httpOnly: true,

                secure:
                    process.env.NODE_ENV === "production",

                sameSite: "lax",

                maxAge: 3600000
            }

        );

        return res.status(200).json({

            success: true,

            message:
                "Login Successful",

            user: {

                id: user.id,

                email: user.email,

                username: user.username

            }

        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({

            success: false,

            message:
                "Login Failed"

        });

    }

}


// LOGOUT

async function handleLogout(req, res) {

    res.clearCookie(

        "token",

        {
            httpOnly: true,

            secure:
                process.env.NODE_ENV === "production",

            sameSite: "lax"

        }

    );

    res.set({

        "Cache-Control":
            "no-cache, no-store, must-revalidate, private",

        "Pragma":
            "no-cache",

        "Expires":
            "0"

    });

    return res.status(200).json({

        success: true,

        message:
            "Logout Successful"

    });

}


// CHECK AUTH

async function handleCheckAuth(
    req,
    res
) {

    res.set({

        "Cache-Control":
            "no-cache, no-store, must-revalidate, private",

        "Pragma":
            "no-cache",

        "Expires":
            "0"

    });

    return res.status(200).json({

        success: true,

        user: {

            id: req.user.id,

            email: req.user.email

        }

    });

}



module.exports = {

    handleUserSignup,

    handleUserLogin,

    handleLogout,

    handleCheckAuth

};