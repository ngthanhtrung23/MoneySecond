var express = require('express');
var router = express.Router();
var budgetController = require('../app/controllers/BudgetController');
/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/insert', budgetController.insert);
router.get('/getBudgets', budgetController.getAll);
module.exports = router;
