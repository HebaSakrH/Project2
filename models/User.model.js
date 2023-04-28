const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
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
    // house: {
    //   type: String,
    //   enum : [
    //      "Gryffindor", "Slytherin", "Ravenclaw" , "Hufflepuff"
    //   ]
    // }
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