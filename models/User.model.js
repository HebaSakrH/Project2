const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case


// const houses = ["Gryffindor", "Hufflepuff", "Ravenclaw", "Slytherin"];
// const randomHouse = houses[Math.floor(Math.random() * houses.length)];




const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: false,
      unique: true
    },
    passwordHash: {
      type: String,
      required: true
    },
    house: {
      type: String,
      enum: ["Gryffindor", "Hufflepuff", "Ravenclaw", "Slytherin"]
    }

  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
);

const User = model("User", userSchema);

module.exports = User;



    // email: {
    //   type: String,
    //   required: true,
    //   unique: true,
    //   lowercase: true,
    //   trim: true
    // },