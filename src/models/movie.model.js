import { Schema, model } from 'mongoose'

const schemaMovie = new Schema(
    {
        NOMBRE_DE_PELICULA: { type: String, uppercase: true, trim: true },

        FECHA_DE_ESTRENO: { type: Number, trim: true },
        
        IMG_DE_PELICULA: { type: String, trim: true },

        PTS_DE_PELICULA: { type: String, trim: true },
    },
    {
        versionKey: false
    }
)

export default model('collectionMovie', schemaMovie)