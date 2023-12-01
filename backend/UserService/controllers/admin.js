import Admin from "../models/admin.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

//authenticating the admin
export const authAdmin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const admin = await Admin.findOne({ email });
        if (admin) {
            if (bcrypt.compareSync(password, admin.password)) {
                const secret = process.env.JWT_SECRET;

                const token = jwt.sign({ id: admin._id, verified: admin.verified, email: admin.email }, secret, {
                    expiresIn: "3h",
                });

                return res.status(200).json({ success: true, user: "Admin", message: "Admin authenticated", token: token });
            }
            return res.status(406).json({ success: false, user: true, message: "Password Incorrect" });
        }
        else {
            return res.status(402).json({ success: false, user: false, message: "Admin doesn't exist" });
        }
    }
    catch (error) {
        return res.status(404).json({ message: error });
    }
}

export const getAllAdmins = async (req, res) => {
    try {
        const admins = await Admin.find();
        res.status(200).json(admins);
    } catch (error) {
        res.status(404).json({ message: error });
    }
}

export const getAdmin = async (req, res) => {
    const id = req.params.id;
    try {
        const admin = await Admin.findById(id);
        res.status(200).json(admin);
    } catch (error) {
        res.status(404).json({ message: error });
    }
}

export const createAdmin = async (req, res) => {
    const admin = req.body;
    const newAdmin = new Admin(admin);
    try {
        await newAdmin.save();
        res.status(201).json(newAdmin);
    } catch (error) {
        res.status(404).json({ message: error });
    }
}

export const updateAdmin = async (req, res) => {
    const id = req.params.id;
    const update = req.body;
    try {
        await Admin.findByIdAndUpdate(id, update);
        res.status(200).send({ status: "Admin details updated" });
    } catch (error) {
        res.status(404).json({ message: error });
    }
}

export const deleteAdmin = async (req, res) => {
    const id = req.params.id;
    try {
        await Admin.findByIdAndDelete(id);
        res.status(200).send({ status: "Admin details deleted" });
    } catch {
        res.status(404).json({ message: error });
    }
}