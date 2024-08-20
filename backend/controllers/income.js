const IncomeSchema = require('../models/incomeModel')

exports.addIncome = async (req, res) => {
    // from the `req.body` we get the data that we'll be adding to the DB
    console.log(req.body)
    const {title, amount, category, description, date} = req.body;

    const income = IncomeSchema({
        title,
        amount,
        category,
        description,
        date
    })

    try {
        // validations
        if(!title || !amount || !category || !description || !date) {
            return res.status(400).json({message: 'All fields are required!'}) // we add status and a message to the status to be shown to the user (FE)
        }
        if(amount <= 0 || typeof amount !== 'number') {
            return res.status(400).json({message: 'Amount must be a positive number!'})
        }

        await income.save() // We are saving to the DB
        res.status(200).json({message: 'Income Added'})
    } catch (error) {
        res.status(500).json({message: error})
    }

    console.log(income)
}

exports.getIncomes = async (req, res) => {
    try {
        const incomes = await IncomeSchema.find().sort({createdAt: -1})
        res.status(200).json(incomes)
    } catch (error) {
        res.status(500).json({message: error})
    }
}

exports.deleteIncome = async (req, res) => {
    const {id} = req.params;

    IncomeSchema.findByIdAndDelete(id)
        .then((income) => {
            res.status(200).json({message: "Income Deleted"})
        })
        .catch((error) => {
            res.status(500).json({message: error})
        })
}
