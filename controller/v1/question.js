const express = require('express')
const router = express.Router()

router.get('/generate-questions', (req, res) => {
    console.log('[INFO] Input query', req.query)
    return res.json({ a: 'b' })
})

module.exports = router