const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            unique: true,
            required: true
        },
        balance:{
            type: Number
        },
        spent:{
            total:{
                type: Number
            },
            bank:{
                type:Number
            },
            otherPlayers:{
                type: Number
            }
        },
        recd:{
            total:{
                type: Number
            },
            bank:{
                type:Number
            },
            otherPlayers:{
                type: Number
            }
        },
        pointData: [Number] 

    }
)

const user = mongoose.model("users", userSchema);

module.exports = user;