import bcrypt from 'bcrypt'

export function hashPassword(pwd){
    return bcrypt.hashSync(pwd,bcrypt.genSaltSync(10))
}

export function isValidPwd(pwd, user){
    return bcrypt.compareSync(pwd, user.password)
}