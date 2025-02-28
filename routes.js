const router = require('express').Router();

(require('./routes/pages'))(router);
(require('./routes/shoptify'))(router);
(require('./routes/cart'))(router);
(require('./routes/users'))(router);
(require('./routes/sessions'))(router);

// Step 1: Add your resource routes to the router composer

module.exports = router;