const { Schema, model, default: mongoose } = require('mongoose')

// TODO: Please make sure you edit the User model to whatever makes sense in this case

const potionSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    ingredients: {
      type: [String],
      required: true,
    },
    difficulty: {
      type: String,
      enum: ['any muggle could make it', 'Hogwarts student level', 'professor Snape level'],
    },
    createdBy: {
      type: mongoose.Types.ObjectId, 
      ref: "User"
    }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
)

const Potion = model('Potion', potionSchema)

module.exports = Potion
