const express = require('express')
const router = express.Router()

// Add your routes here - above the module.exports line

router.post('*', function(req, res, next) {
	console.log(req.body)
	if (req.body['next-page']) {
		res.redirect(req.body['next-page'])
	} else {
		next()
	}
})

router.all('*', (req, res, next) => {
	req.session.data.queryError = 'false'
	next()
})

router.post('/validate-queries', (req, res) => {
	const queryKey = Object.keys(req.body).filter(key =>
		key.endsWith('-reason')
	)[0]
	var hasError = false
	if (queryKey) {
		hasError = req.body[queryKey] == '' || req.body[queryKey] == null
	}
	if (hasError) {
		req.session.data.queryError = 'true'
		res.redirect(req.headers.referer)
	} else {
		res.redirect(req.body['success-page'])
	}
})

module.exports = router
