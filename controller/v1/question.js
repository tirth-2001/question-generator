const express = require('express')
const router = express.Router()

const QuestionStore = require('../../services/question_store.json')

const generateQuestions = (totalMarks, difficulty) => {
    const questionStoreMarks = {
        allQuestionsMarks: 0,
        easyQuestionsMarks: 0,
        mediumQuestionsMarks: 0,
        hardQuestionsMarks: 0,
    }

    const difficultyMarks = {
        easy: (difficulty.easy / 100) * totalMarks,
        medium: (difficulty.medium / 100) * totalMarks,
        hard: (difficulty.hard / 100) * totalMarks,
    }

    // This function calculates Total Score of Each 3 difficulty levels
    function calculateQuestionStoreMarks() {
        QuestionStore.forEach((question, index) => {
            if (question.difficulty === 'easy') {
                questionStoreMarks.easyQuestionsMarks += question.marks
            } else if (question.difficulty === 'medium') {
                questionStoreMarks.mediumQuestionsMarks += question.marks
            } else if (question.difficulty === 'hard') {
                questionStoreMarks.hardQuestionsMarks += question.marks
            }
            questionStoreMarks.allQuestionsMarks += question.marks
        })
    }

    // This function randomize the given list of questions
    function randomizeQuestion(questionArray) {
        for (let i = questionArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1))
            const temp = questionArray[i]
            questionArray[i] = questionArray[j]
            questionArray[j] = temp
        }
        return questionArray
    }

    //  This function groups the given array of objects based on particular key
    function groupBy(objectArray, property) {
        return objectArray.reduce((acc, obj) => {
            const key = obj[property]
            if (!acc[key]) {
                acc[key] = []
            }
            acc[key].push(obj)
            return acc
        }, {})
    }

    calculateQuestionStoreMarks()

    // Here we are checking the validation of the input based on Total Marks and Difficulty Specific Marks

    if (totalMarks > questionStoreMarks.allQuestionsMarks) {
        console.log('\nINFO ==> Not enough questions in the question store\n')
    } else if (difficultyMarks.easy > questionStoreMarks.easyQuestionsMarks) {
        console.log(
            '\nINFO ==> Not enough questions in the question store for EASY\n'
        )
    } else if (difficultyMarks.medium > questionStoreMarks.mediumQuestionsMarks) {
        console.log(
            '\nINFO ==> Not enough questions in the question store for MEDIUM\n'
        )
    } else if (difficultyMarks.hard > questionStoreMarks.hardQuestionsMarks) {
        console.log(
            '\nINFO ==> Not enough questions in the question store for HARD\n'
        )
    } else {
        let easyQuestions = []
        let mediumQuestions = []
        let hardQuestions = []
        let easyMarks = 0
        let mediumMarks = 0
        let hardMarks = 0

        // This function generates the questions based on the difficulty level
        // after checking total required marks of that difficulty level
        QuestionStore.forEach((question, index) => {
            if (question.difficulty === 'easy') {
                if (easyMarks + question.marks <= difficultyMarks.easy) {
                    easyQuestions.push(question)
                    easyMarks += question.marks
                }
            } else if (question.difficulty === 'medium') {
                if (mediumMarks + question.marks <= difficultyMarks.medium) {
                    mediumQuestions.push(question)
                    mediumMarks += question.marks
                }
            } else if (question.difficulty === 'hard') {
                if (hardMarks + question.marks <= difficultyMarks.hard) {
                    hardQuestions.push(question)
                    hardMarks += question.marks
                }
            }
        })

        const allQuestions = [].concat(
            easyQuestions,
            mediumQuestions,
            hardQuestions
        )

        const randomQuestions = randomizeQuestion(allQuestions)

        const groupedQuestions = groupBy(allQuestions, 'subject')

        // Here we are returning the object with all the questions, marks and no. of questions.
        // It is difficulty specific.
        // Also we are returning the randomize question set.
        // Also we are returning the grouped questions based on subject.
        const questionPaper = {
            easyQuestions: {
                questions: easyQuestions,
                questionnos: easyQuestions.length,
                marks: easyMarks,
                requiredMarks: difficultyMarks.easy,
            },
            mediumQuestions: {
                questions: mediumQuestions,
                questionnos: mediumQuestions.length,
                marks: mediumMarks,
                requiredMarks: difficultyMarks.medium,
            },
            hardQuestions: {
                questions: hardQuestions,
                questionnos: hardQuestions.length,
                marks: hardMarks,
                requiredMarks: difficultyMarks.hard,
            },
            totalMarks: easyMarks + mediumMarks + hardMarks,
            requiredTotalMarks: totalMarks,
            totalQuestionsNos: allQuestions.length,
            allQuestions: allQuestions,
            randomQuestions: randomQuestions,
            groupedBySubject: groupedQuestions,
        }

        return questionPaper
    }
}

// will return the JSON of all questions on /generate-questions (hardcore)
router.get('/generate-questions', (req, res) => {
    return res.json(
        generateQuestions(100, {
            easy: 20,
            medium: 50,
            hard: 30,
        })
    )
})

// will return the JSON of all questions on /generate-questions/:totalMarks/:easyPer/:medPer/:hardPer

router.get(
    '/generate-questions/:totalMarks/:easyPer/:medPer/:hardPer',
    (req, res) => {
        console.log('[INFO] Input query', req.query)
        const totalMarks = parseInt(req.params.totalMarks)
        const easyPer = parseInt(req.params.easyPer)
        const medPer = parseInt(req.params.medPer)
        const hardPer = parseInt(req.params.hardPer)

        return res.json(
            generateQuestions(totalMarks, {
                easy: easyPer,
                medium: medPer,
                hard: hardPer,
            })
        )
    }
)

module.exports = router