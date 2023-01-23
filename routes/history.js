var express = require('express');
var router = express.Router();
const query = require('../utils/query')

/* GET users listing. */
router.get('/',  async function (req, res, next) {
  const items = await query.get('SELECT * FROM items');
  console.log(items)
  res.render('history', { items: items });
});

module.exports = router;
