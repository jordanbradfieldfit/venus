const router = require('express').Router();

router.get('/transaction', (req, res) => {
    res.send("This is the orderer");
});

module.exports = router;