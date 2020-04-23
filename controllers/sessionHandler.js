const jwt = require('jsonwebtoken');
const redis = require('redis');

//setup Redis:

const redisClient = redis.createClient(process.env.REDIS_URI)

const getAuthTokenId = (req, res) => {
	const { authorization } = req.headers;
	return redisClient.get(authorization, (err, reply) => {
		if (err || !reply ) {
			return res.status(400).json('not authorized');
		}
		return res.json({id: reply})
	})
}

const signToken = (email) =>  {
	const jwtPaylaod = { email };
	return jwt.sign(jwtPaylaod, 'JWT_SECRET', { expiresIn: '2 days'});
}

const setToken = (key, value) => {
	return Promise.resolve(redisClient.set(key, value))
}

const deleteToken = (req, res) => {
	const { token } = req.body;
	return redisClient.del(token, (err, reply) => {
		if (err || !reply ) {
			return res.status(400).json('unRegistered');
		}
		return res.json('signout successfully')
	})
}

const createSessions = (user) => {
	// jwt token 
	const { email, id } = user;
	const token = signToken(email);
	return setToken(token, id)
		.then(() => { return {success: true, userId: id, token} })
		.catch(console.log)

}

module.exports = {
    createSessions, getAuthTokenId, deleteToken, redisClient
}