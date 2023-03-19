import { Schema, model } from 'mongoose'

const schemaMovie = new Schema(
    {
        NOMBRE_DE_PELICULA: { type: String, uppercase: true, trim: true },

        PTS_DE_PELICULA: { type: String, trim: true },

        FECHA_DE_ESTRENO: { type: Number, trim: true },

        MIMETYPE_FILE: { type: String, trim: true },

        PATH_PRIVATE: { type: String, trim: true },
        
        PATH_PUBLIC: { type: String, trim: true },
    },
    {
        versionKey: false
    }
)

export default model('collectionMovie', schemaMovie)