import { Schema, model } from 'mongoose'

const schemaPost = new Schema(
    {
        description: { type: String, trim: true, default: 'Post of user' },

        mimetype_file: { type: String, trim: true },

        path_public: { type: String, trim: true },

        user_id: {
            type: Schema.Types.ObjectId,
            ref: 'collectionUser'
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
)

export default model('collectionPost', schemaPost)