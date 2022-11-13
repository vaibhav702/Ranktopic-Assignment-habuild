const topicModel = require('../model/topicModel')
const validator = require('../validator/validator')
const userModel = require('../model/userModel')


const addTopics = async function (req, res) {
    try {
        requestBody = req.body
        const { topic, rank,userId } = requestBody;

        
        if (!validator.isValidRequestBody(requestBody)) {
            return res.status(400).send({ status: false, message: 'Invalid request parameters. Please provide review details to update.' })
        }
        if (userId != req.userId) {
                return res.status(403).send({
                    status: false,
                    message: "Unauthorized access ! User's credentials do not match."
                })
            }
        
        if (!validator.isValid(topic)) {
            return res.status(400).send({ status: false, message: "topicTitle is required" })
        }
        if (!validator.isValid(rank)) {
            return res.status(400).send({ status: false, message: "topicRank is required" })
        }
        if (!validator.validRating(rank)) {
            return res.status(400).send({ status: false, message: "Rating must be 1 to 100." })
        }
       
        if (!(rank >= 1 && rank <= 100)) {
            return res.status(400).send({ status: false, message: "Rank must be in between 1 to 100." })
        }
     
        const Data = await topicModel.create(requestBody)
        return res.status(201).send({ status: true, message: "Successfully saved data", data: Data })
     } catch (err) {
        return res.status(500).send({ status: false, Error: err.message })
    }
}

const updateRankDetails = async function (req, res) {
    try {
        const params = req.params.topicId
        const requestUpdateBody = req.body
        const userIdFromToken = req.userId
        const {rank} = requestUpdateBody;

        if (!validator.isValidObjectId(userIdFromToken)) {
            return res.status(402).send({ status: false, message: "Unauthorized access !" })
        }
        if (!validator.isValidObjectId(params)) {
            return res.status(400).send({ status: false, message: "Invalid bookId." })
        }

        if (!validator.isValidRequestBody(requestUpdateBody)) {
            return res.status(400).send({ status: false, message: 'Invalid request parameters. Please provide book details to update.' })
        }
        
        if (rank) {

            if (!validator.validString(rank)) {
                return res.status(400).send({ status: false, message: "Rank is missing ! Please provide the Rank details to update." })
            };
           
        } 

       
        const searchTopics = await topicModel.findById({
            _id: params,
        })
        if (!searchTopics) {
            return res.status(404).send({ status: false, message: `topic does not exist by this ${params}.` })
        }

       
        if (searchTopics.userId != req.userId) {
            return res.status(401).send({
                status: false,
                message: "Unauthorized access."
            })
        }
        if (searchTopics) {
            const changeDetails = await topicModel.findOneAndUpdate({ _id: params }, {rank}, { new: true })

            res.status(200).send({ status: true, message: "Successfully updated rank details.", data: changeDetails })
        } else {
            return res.status(400).send({ status: false, message: "Unable to update details.Topic has been already deleted" })
        }
    } catch (err) {
        return res.status(500).send({ status: false, Error: err.message })
    }
}
const getRankDetails=async function (req, res) {
    try{
        const requestBody = req.body
        const { userId } = requestBody;
        if (userId != req.userId) {
            return res.status(403).send({
                status: false,
                message: "Unauthorized access ! User's credentials do not match."
            })
        }
        const getAllDetails = await topicModel.find({isDeleted:false})
        res.status(200).send({ status: true, message: "Successfully fetch rank details.", data: getAllDetails })

    }
 catch (err) {
    return res.status(500).send({ status: false, Error: err.message })
}
}


module.exports = {
    addTopics,
    updateRankDetails,
    getRankDetails
}