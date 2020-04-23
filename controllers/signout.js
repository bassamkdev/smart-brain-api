const deleteToken = require('./sessionHandler').deleteToken;

const handleSignout = (req, res) => {
    deleteToken(req,res);
}

module.exports = {
    handleSignout
}