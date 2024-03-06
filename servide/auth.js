const jwt = require('jsonwebtoken');
const secret = "Sarvesh$123$";


function setUse(user) {
    return jwt.sign({
        _id:user._id,
        email:user.email,
    },secret);
}

function getUser(token) {
   
    if(!token) return null;
    try {
        return jwt.verify(token, secret);
    } catch (error) {
        return null
        
    }
}

module.exports={
    setUse,
    getUser,

}
