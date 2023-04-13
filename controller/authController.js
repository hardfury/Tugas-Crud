import User from "../model/user.js"
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken"

export const register = async (req, res) => {
    try {
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(req.body.password, salt)

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash,
        })
        await newUser.save()

        res.status(200).json({
            success: true,
            message: "register success",
            data: newUser,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Register Failed',
        })
    }
}

export const login = async (req, res) => {
    const {email, password} = req.body

    try {
        const user = await User.findOne({where: { email : email } })
        if (!user){
        return res.status(404).json({
            success: false,
            message: "pengguna tidak ditemukan"
        })
    }
    
    const checkCorrectPassword = await bcrypt.compare(password, user.password)
    if(!checkCorrectPassword){
        return res.status(401).json({
            success: false,
            message: "kesalahan email atau password"
        })
    }

    const { password: omitPassword, role, ...rest } = user

    const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "15d" }
    );

    res.cookie('accessToken', token, {
        httpOnly: true,
        expires: token.expiresIn,
    }).status(200).json({
        token,
        data: {...rest },
        role,
    })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Gagal untuk login"
        })
    }
}

export const logout = async ( req, res ) => {
    try {
        res.clearCookie('accessToken')
        res.status(200).json({
            success: true,
            message: 'logout berhasil'
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'logout gagal'
        })
    }
}