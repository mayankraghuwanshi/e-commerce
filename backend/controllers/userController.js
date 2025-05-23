import asyncHandler from '../middleware/asyncHandler.js'
import User from '../Models/userModel.js'
import jwt from 'jsonwebtoken'



//@desc user and get token
//@routes POST /api
//@access public 
const authUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body
    const user = await User.findOne({email})
    
    if (user && (await user.matchPassword(password))) {
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '30d'
        })

        // Set JWT as HTTP-Only cookie
        res.cookie('jwt', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'strict',
            maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
        })

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isadmin
        })
    } else {
        res.status(401)
        throw new Error('Invalid email or password')
    }
})

//@desc register user
//@routes POST /api/user
//@access public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body
    console.log('Registration attempt:', { name, email, password })

    const userExists = await User.findOne({ email })
    console.log('User exists check:', userExists ? 'Yes' : 'No')

    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    const user = await User.create({
        name,
        email,
        password
    })
    console.log('User created:', user ? {
        id: user._id,
        email: user.email,
        hasPassword: !!user.password
    } : 'Failed to create user')

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isadmin
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

//@desc logout user / clear cookie
//@routes POST /api/user/logout
//@access private
const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    })
    res.status(200).json({message: 'Logged out successfully'})
})

//@desc Get user profile
//@routes Get /api/user/profile
//@access private
const getUserProfile = asyncHandler(async (req, res) => {
    res.send('get user profile')
})

//@desc Get user profile
//@routes Put /api/user/profile
//@access private
const updateUserProfile = asyncHandler(async (req, res) => {
    res.send('update user profile')
})

//@desc Get all users
//@routes GET /api/users
//@access private/Admin
const getUsers = asyncHandler(async (req, res) => {
    res.send('get users')
})

//@desc Delete user
//@routes DELETE /api/users/:id
//@access private/Admin
const deleteUser = asyncHandler(async (req, res) => {
    res.send('delete user')
})

//@desc Get user by ID
//@routes GET /api/users/:id
//@access private/Admin
const getUserById = asyncHandler(async (req, res) => {
    res.send('get user by id')
})

//@desc Update user
//@routes PUT /api/users/:id
//@access private/Admin
const updateUser = asyncHandler(async (req, res) => {
    res.send('update user')
})

export {
    authUser,
    registerUser,
    getUserProfile,
    updateUserProfile,
    logoutUser,
    getUsers,
    deleteUser,
    getUserById,
    updateUser
}
















