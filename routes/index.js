var express = require('express');
var router = express.Router();
var budgetController = require('../app/controllers/BudgetController');
/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.post('/insert', budgetController.insert);
router.get('/getBudgets', budgetController.getAllBudgets);
router.get('/getBudget/:id', budgetController.getBudgetByAccountNumber);
router.post('/updateBudget', budgetController.updateBudget);
router.post('/updateAmountSpent', budgetController.updateAmountSpent);
module.exports = router;
