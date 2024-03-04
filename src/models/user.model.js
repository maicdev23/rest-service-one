import { Schema, model } from 'mongoose'

const schemaUser = new Schema(
    {
        fullname: { type: String, uppercase: true, trim: true },

        username: { type: String, trim: true },

        password: { type: String, trim: true },

        telefono: { type: Number, default: 555 },

        direccion: { type: String, default: 'Manta' },

        rol: {
            type: Schema.Types.ObjectId,
            ref: 'collectionUserRol', 
        }
    },
    {
        versionKey: false
    }
)

export default model('collectionUser', schemaUser)