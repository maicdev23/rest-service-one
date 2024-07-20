import bcrypt from "bcrypt";

export const encrypt = async (password) => {
    const encrypt = await bcrypt.hash(password, 10)
    return encrypt
}

export const decrypt = async (pass, passHash) => {
    const match = await bcrypt.compare(pass, passHash)
    return match
}