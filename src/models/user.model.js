import { Schema, model } from 'mongoose'
import bcrypt from "bcryptjs";

const schemaUser = new Schema(
    {
        fullname: { type: String, uppercase: true, trim: true },

        username: { type: String, trim: true },

        password: { type: String, trim: true },

        rol: {
            type: Schema.Types.String,
            ref: 'collectionUserRol'
        }
    },
    {
        versionKey: false
    }
)

schemaUser.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    return hash
}

schemaUser.methods.decryptPassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

export default model('collectionUser', schemaUser)