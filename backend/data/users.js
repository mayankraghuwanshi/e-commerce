import bcrypt from 'bcryptjs'

const users = [
    {
        name:'Admin-user',
        email:'admin@emailcom',
        password:bcrypt.hashSync('123456', 10),
        isAdmin:true,
    },
    {
        name:'John doe',
        email:'john@email.com',
        password:bcrypt.hashSync('123456', 10),
        isAdmin:false,
    },
    {
        name:'jane Doe',
        email:'jane@email.com',
        password:bcrypt.hashSync('123456', 10),
        isAdmin:false,
    }
]


export default users