import { Schema, model } from 'mongoose'

const schemaMovie = new Schema(
    {
        NAME: { type: String, uppercase: true, trim: true },

        VALUE: { type: String, trim: true },

        DATE: { type: String, trim: true },

        MIMETYPE_FILE: { type: String, trim: true },
        
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