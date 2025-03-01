const express = require('express')
const { authMiddleware } = require('../middleware')
const { Account } = require('../db')
const { default: mongoose } = require('mongoose') 

const router = express.Router()



//transfer(bad sol)
// router.post('/transfer', authMiddleware, async (req,res) => {
//     const { amount, to } = req.body

//     const account = await Account.findOne({
//         userId: req.userId
//     })
//     if(account.balance < amount){
//         res.status(400).json({
//             message: "Insufficient Balance"
//         })
//     }

//     const toAccount = Account.findOne({
//         userId: to
//     })
//     if(!toAccount){
//         res.status(400).json({
//             message:"Invalid Account"
//         })
//     }

//     await Account.upadteOne(
//         {
//         userId: req.userId
//         },{
//         balance: -amount
//         }
//     )

//     await Account.upadteOne(
//         {
//         userId: to,
//         },{
//             $inc:{
//                 balance: amount,
//                 }
//         }
//     )
// })


//transfer (good sol)
router.post('/transfer', authMiddleware, async(req, res) => {
    const session = await mongoose.startSession()

    try{
        session.startTransaction()
    
        const { amount, to } = req.body
    
        const account = await Account.findOne({userId: req.userId}).session(session)
        if(!account || account.balance < amount){
            await session.abortTransaction()
            return res.status(400).json({
                message: "Insufficient Balance"
            })
            return;
        }
    
        const toAccount = await Account.findOne({userId:to}).session(session)
        if(!toAccount){
            await session.abortTransaction()
            res.status(400).json({
                message:"Invalid account"
            })
            return;
        }
    
        await Account.updateOne(
            {userId: req.userId}, 
            {$inc:{balance:-amount}},
            { session }
        )
        await Account.updateOne(
            {userId:to}, 
            { $inc:{balance:amount}},
            { session }
        )
    
        await session.commitTransaction()
        res.json({
            message: "Transfer Successfully"
        })
    }catch(err){
        await session.abortTransaction()
        console.error(err)
        res.status(500).json({
            message:"server error. please try again later"
        })
    }finally{
        session.endSession()
    }
})

router.get("/balance", authMiddleware, async (req, res) => {
    try {
        const account = await Account.findOne({ userId: req.userId });
        if (!account) {
            return res.status(404).json({ message: "Account not found" });
        }

        res.json({ balance: account.balance });
    } catch (error) {
        console.error("Error fetching balance:", error);
        res.status(500).json({ message: "Server error" });
    }
});


module.exports = router