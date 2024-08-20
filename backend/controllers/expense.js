const ExpenseSchema = require('../models/expenseModel')

exports.addExpense = async (req, res) => {
    // from the `req.body` we get the data that we'll be adding to the DB
    console.log(req.body)
    const {title, amount, category, description, date} = req.body;

    const expense = ExpenseSchema({
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

        await expense.save() // We are saving to the DB
        res.status(200).json({message: 'Expense Added'})
    } catch (error) {
        res.status(500).json({message: error})
    }
}

exports.getExpenses = async (req, res) => {
    try {
        const expenses = await ExpenseSchema.find().sort({createdAt: -1})
        res.status(200).json(expenses)
    } catch (error) {
        res.status(500).json({message: error})
    }
}

exports.deleteExpense = async (req, res) => {
    const {id} = req.params;

    ExpenseSchema.findByIdAndDelete(id)
        .then((expense) => {
            res.status(200).json({message: "Expense Deleted"})
        })
        .catch((error) => {
            res.status(500).json({message: error})
        })
}
