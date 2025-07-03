import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"

const userSchema = new Schema(
    {

        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim:true,
            index:true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim:true,
        },
        fullName: {
            type: String,
            required: true,
            trim:true,
            index: true
        },
        avatar: {
            type: String, //cloudinary url
            required: true,
        },
        coverImage: {
            type: String,
        },
        watchHistory:[
             {
                type:Schema.Types.ObjectId,
                ref:"Video"
             }
        ],

        password:{
            type:String,
            required:[true, 'Password is required']
        },
        refreshToken:{
            type:String,
        }
        
    },
    {
        timeseries:true
    }

)


userSchema.pre("save", async function(next) {
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password,  10)
    next()
})

userSchema.methods.isPasswordCorrect = async function (password) {
    await bcrypt.compare(password, this.password)
}


userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id:this._id,
            email:this.email,
            username:this.username,
            fullName:this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }

    )
}
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id:this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }

    )
}




export const User = mongoose.model("User", userSchema)




// “What is a JWT? Is it a Bearer token?”
// Here’s a strong and concise answer:

// JWT stands for JSON Web Token. It's a compact and self-contained way to transmit information securely between parties as a JSON object. It is often used for authentication.

// Yes, JWT is commonly used as a Bearer token in HTTP requests. When a user logs in, the server generates a JWT and sends it to the client. The client includes this token in the Authorization header as:
// Authorization: Bearer <JWT>

// A JWT typically has three parts: Header, Payload, and Signature. The signature is created using a secret key, which ensures that the token is tamper-proof. On each request, the server can verify the token using the secret, decode the payload, and authorize the user.
