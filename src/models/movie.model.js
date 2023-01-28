import { Schema, model } from 'mongoose'

const schemaMovie = new Schema(
    {
        NOMBRE_DE_PELICULA: { type: String },

        FECHA_DE_ESTRENO: { type: Number },
        
        IMG_DE_PELICULA: { type: String },

        PTS_DE_PELICULA: { type: String },
    }
)

schemaMovie.methods.toJSON = function () {
    const {__v, ...data}=this.toObject();
    return data;
}

export default model('collectionMovie', schemaMovie)