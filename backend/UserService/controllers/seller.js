import Seller from "../models/seller.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import nodemailer from 'nodemailer';
import axios from 'axios';

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    },
});

//authenticating the seller
export const authSeller = async (req, res) => {
    const { email, password } = req.body;
    try {
        const seller = await Seller.findOne({ email });
        if (seller) {
            if (bcrypt.compareSync(password, seller.password)) {
                const secret = process.env.JWT_SECRET;

                const token = jwt.sign({ id: seller._id, verified: seller.verified, brand: seller.companyName, emai: seller.email, contactNo: seller.contactNo }, secret, {
                    expiresIn: "3h",
                });

                return res.status(200).json({ success: true, user: "Seller", message: "Seller authenticated", token: token });
            }
            return res.status(406).json({ success: false, user: true, message: "Password Incorrect" });
        }
        else {
            return res.status(402).json({ success: false, user: false, message: "Seller doesn't exist" });
        }
    }
    catch (error) {
        return res.status(404).json({ message: error });
    }
}

export const getAllSellers = async (req, res) => {
    try {
        const sellers = await Seller.find();
        res.status(200).json(sellers);
    } catch (error) {
        res.status(404).json({ message: error });
    }
}

export const getSeller = async (req, res) => {
    const id = req.params.id;
    try {
        const seller = await Seller.findById(id);
        res.status(200).json(seller);
    } catch (error) {
        res.status(404).json({ message: error });
    }
}

export const createSeller = async (req, res) => {
    const seller = req.body;
    const newSeller = new Seller(seller);
    try {
        await newSeller.save();
        res.status(201).json(newSeller);
    } catch (error) {
        res.status(404).json({ message: error });
    }

    const id = newSeller._id;

    const url = `http://localhost:3000/verifySeller/${id}`;

    await transporter.sendMail({
        from: process.env.EMAIL,
        to: newSeller.email,
        subject: "Verify your email",
        html: `Please click this email to <a href="${url}">verify</a>`,
    });

    axios.post(`https://app.notify.lk/api/v1/send`, {
        user_id: process.env.USER_ID,
        api_key: process.env.API_KEY,
        sender_id: "NotifyDEMO",
        to: newSeller.contactNo,
        message: `New Seller Account Created for ${newSeller.companyName}`
    })
        .then(res => {
            console.log(res.data);
        }).catch(err => {
            console.log(err);
        }
        );
}

export const updateSeller = async (req, res) => {
    const id = req.params.id;
    const update = req.body;
    try {
        await Seller.findByIdAndUpdate(id, update);
        res.status(200).send({ status: "Seller details updated" });
    } catch (error) {
        res.status(404).json({ message: error });
    }
}

export const deleteSeller = async (req, res) => {
    const id = req.params.id;
    try {
        await Seller.findByIdAndDelete(id);
        res.status(200).send({ status: "Seller details deleted" });
    } catch {
        res.status(404).json({ message: error });
    }
}

export const verifySeller = async (req, res) => {
    try {
        const id = req.params.id;
        await Seller.findByIdAndUpdate(id, { verified: true });
        res.status(200).send({ status: "Seller verified" });
    } catch (error) {
        res.status(404).json({ message: error });
    }
}