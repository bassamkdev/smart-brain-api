const sessionHandler = require('./sessionHandler');

const handleSignin = (req,res,bcrypt,db) => {
	const { email, password } = req.body;
	if (!email || !password) {
		return Promise.reject('wrong information submition!');
	}
	return db.select('email', 'hash').from('login')
		.where('email', '=', email)
		.then(data =>{
			const isValid = bcrypt.compareSync(password, data[0].hash);
			if (isValid){
				return db.select('*').from('users')
					.where('email', '=', email)
					.then(user => user[0])
					.catch(err => Promise.reject('unable to get user'))
			} else {
				Promise.reject('wrong credentials')
			}
		})
		.catch(err => Promise.reject('wrong credentials'))
}



const signinAuthentication = (req, res, bcrypt, db) => {
	const { authorization } = req.headers;
	return authorization ? 
		sessionHandler.getAuthTokenId(req, res) : 
		handleSignin(req, res, bcrypt, db)
			.then(data => {
				return data.id && data.email ? 
				sessionHandler.createSessions(data) :
				Promise.reject(data)
			})
			.then(session => res.json(session))
			.catch(err => res.status(400).json(err))
}

module.exports ={
	signinAuthentication: signinAuthentication,
};