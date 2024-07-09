const { getParty, createParty } = require('../controllers/PartyController');
const { getWeapons, getWeaponById } = require('../controllers/PublicConroller');
const { register, login } = require('../controllers/UserController');
const { authentication } = require('../helpers/authentication');
const router = require('express').Router()

router.get('/pub/weapons', getWeapons);
router.get('/pub/weapons/:id', getWeaponById);
router.post('/register', register);
router.post('/login', login);

router.use(authentication);
router.get('/party', getParty);
router.post('/party', createParty);

module.exports = router