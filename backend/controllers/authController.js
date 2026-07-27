import { sql } from '../config/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { generateToken } from '../utils/generateToken.js';

export const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        const existingUser = await sql `SELECT * FROM users WHERE email =${email}`;
        if (existingUser.length > 0) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hashSync(password, 10);

        await sql `INSERT INTO users (username,email,password) 
                   VALUES (${username},${email},${hashedPassword})`;
                   res.status(201).json({ success: true, message: 'User registered successfully' });
    }
    catch (err) {
        console.error('Error registering user:', err);
        res.status(500).json({ success: false, message: 'Server error' });
    }


}

export const loginUser = async (req, res) => {
    try {
        const { email, password,rememberMe } = req.body;
        // console.log(req.body);
        if (!email || !password) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        const users = await sql `SELECT * FROM users WHERE email = ${email}`;
        if (users.length === 0) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const user = users[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }


        const expiresIn = rememberMe ? '30d' : '1d';
        const token = generateToken(user.id,expiresIn);
        return res.status(200).json({
            success: true,
            message: "User logged in successfully",
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
            }
        });

    }
    catch (err) {
        console.error('Error logging in user:', err);
        res.status(500).json({ success: false, message: 'Server error' });
    }

}

export const updateProfile = async (req, res) => {
    try{
        const { username, email } = req.body;
        if (!username || !email) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }
        const existingUser = await sql`SELECT * FROM users WHERE email = ${email} AND id != ${req.user.id}`;
        if (existingUser.length > 0) {
            res.status(400).json({ message: 'Email already in use' });
        }
        const updatedUser = await sql`UPDATE users SET username = ${username}, email = ${email} WHERE id = ${req.user.id} 
        RETURNING id, username, email`;
        res.status(200).json({ success: true, message: 'Profile updated successfully', user: updatedUser[0] });
    }catch(err){
        console.error('Error updating profile:', err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

export const changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        const user = await sql`
            SELECT *
            FROM users
            WHERE id = ${req.user.id}
        `;

        if (user.length === 0) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        const isMatch = await bcrypt.compare(
            currentPassword,
            user[0].password
        );

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Current password is incorrect",
            });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await sql`
            UPDATE users
            SET password = ${hashedPassword}
            WHERE id = ${req.user.id}
        `;

        res.status(200).json({
            success: true,
            message: "Password updated successfully",
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to update password",
        });
    }
};

export const getCurrentUser = async (req, res) => {
  try {
    const user = await sql`
      SELECT id, username, email, created_at,profile_image
      FROM users
      WHERE id = ${req.user.id}
    `;

    if (user.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user: user[0],
    });

  } catch (error) {
    console.error("Error fetching current user:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};