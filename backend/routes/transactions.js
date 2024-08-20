const {addIncome, getIncomes, deleteIncome} = require("../controllers/income");
const {addExpense, getExpenses, deleteExpense} = require("../controllers/expense");
const router = require('express').Router();

/* Simple get method
router.get('/', (req, res) => {
    res.send("Hello World")
})
*/

router.post('/add-income', addIncome)
    .get('/get-incomes', getIncomes)
    .delete('/delete-income/:id', deleteIncome)
    .post('/add-expense', addExpense)
    .get('/get-expenses', getExpenses)
    .delete('/delete-expense/:id', deleteExpense)

module.exports = router
