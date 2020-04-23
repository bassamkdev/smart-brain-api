const sessionHandler = require('./sessionHandler');

const AddDataToDb = (req, res, bcrypt, db)=>{
	const {email, name, password } = req.body
	if (!email || !password || !name) {
		return res.status(400).json('wrong information submition!');
	}
	const hash = bcrypt.hashSync(password);
		return db.transaction(trx => {
			trx.insert({
				hash: hash,
				email: email
			})
			.into('login')
			.returning('email')
			.then(loginEmail => {
				return trx('users')
				.returning('*')
				.insert({
					email: loginEmail[0],
					name: name,
					joined: new Date()
				}).then(user => user[0])
				})
				.then(trx.commit)
				.catch(trx.rollback)
		})
		.catch(err => Promise.reject('Unable to Register'));
}

const handleRegister = (req, res, bcrypt, db) => {
	return AddDataToDb(req, res, bcrypt, db)
	.then(data => {
		return data.id && data.email ? 
		sessionHandler.createSessions(data) :
		Promise.reject(data)
	})
	.then(session => res.json(session))
	.catch(err => res.status(400).json(err))
}


module.exports ={
	handleRegister: handleRegister
};