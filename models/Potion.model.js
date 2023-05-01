const { Schema, model } = require('mongoose')

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
    // add something to know wich user create each potion
    
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
)

const Potion = model('Potion', potionSchema)

module.exports = Potion
