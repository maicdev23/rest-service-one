import { Schema, model } from 'mongoose'

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

export default model('collectionUser', schemaUser)