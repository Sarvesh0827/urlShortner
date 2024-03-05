const sessionIdtoUserMap = new Map();

function setUse(id,user) {
    sessionIdtoUserMap.set(id, user);
}

function getUser(id) {
    return  sessionIdtoUserMap.get(id);
    
}

module.exports={
    setUse,
    getUser,

}
