var express = require('express');
var router = express.Router();
var budgetController = require('../app/controllers/BudgetController');
var dataTrekController = require('../app/controllers/DataTrekController');
/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});

router.get('/income', function(req, res) {
  res.render('income');
});
router.get('/moneyInsight', function(req, res) {
  res.render('moneyInsight');
});

router.post('/budget', budgetController.insert);
router.get('/getBudgets', budgetController.getAllBudgets);
router.get('/getBudget/:id', budgetController.getBudgetByAccountNumber);
router.post('/updateBudget', budgetController.updateBudget);
router.post('/updateAmountSpent', budgetController.updateAmountSpent);
router.post('/userData', dataTrekController.userData);
router.post('/monthlyExpense', dataTrekController.monthlyExpense);
router.post('/monthlyIncome', dataTrekController.monthlyIncome);
router.post('/spendCategory', dataTrekController.spendCategory);
router.post('/incomeCategory', dataTrekController.incomeCategory);
module.exports = router;
