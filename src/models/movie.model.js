import { Schema, model } from 'mongoose'

const schemaMovie = new Schema(
    {
        descripcion: { type: String, uppercase: true, trim: true },

        calificacion: { type: String, trim: true },

        fechaEstreno: { type: String, trim: true },

        MIMETYPE_FILE: { type: String, trim: true },

        PATH_PRIVATE: { type: String, trim: true },
        
        PATH_PUBLIC: { type: String, trim: true },

        USER: {
            type: Schema.Types.ObjectId,
            ref: 'collectionUser'
        }
    },
    {
        versionKey: false
    }
)

export default model('collectionMovie', schemaMovie)