const express = require('express')
const router = express.Router()
const questionService = require('../../services/generateQuestion')

const QuestionStore = require('../../models/question_store.json')

// will return the JSON of all questions on /generate-questions (hardcore)
// router.get('/generate-questions', (req, res) => {
//     return res.json(
//         generateQuestions(100, {
//             easy: 20,
//             medium: 50,
//             hard: 30,
//         })
//     )
// })

// will return the JSON of all questions on /generate-questions

router.get('/generate-questions', (req, res) => {
    // #swagger.tags = ['Question']
    // #swagger.description = 'Endpoint to generate questions. Click on <b>Try it out</b> button to generate questions. You can enter below parameters to customize output questions.'

    console.log('[INFO] Input query', req.query)
    const totalMarks = parseInt(req.query.totalMarks) || 100
    const easyPer = parseInt(req.query.easyPercentage) || 20
    const medPer = parseInt(req.query.mediumPercentage) || 50
    const hardPer = parseInt(req.query.hardPercentage) || 30

    return res.json(
        questionService.generateQuestions(totalMarks, {
            easy: easyPer,
            medium: medPer,
            hard: hardPer,
        })
    )
})

module.exports = router