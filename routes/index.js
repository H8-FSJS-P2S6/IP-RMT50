const { getParty, createParty, createTeam, updateParty, deleteParty, updateTeam } = require('../controllers/PartyController');
const { getWeapons, getWeaponById } = require('../controllers/PublicConroller');
const { register, login } = require('../controllers/UserController');
const { authentication } = require('../middlewares/authentication');
const { authorization, isAdmin } = require('../middlewares/authorization');
const router = require('express').Router()

router.get('/weapons', getWeapons);
router.get('/weapons/:id', getWeaponById);
router.post('/login', login);


router.use(authentication);

router.post('/register', isAdmin, register);
router.get('/party', getParty);
router.post('/party', createParty);
router.delete('/party/:id', authorization, deleteParty);
router.post('/party/:id/team', createTeam);
router.put('/party/:id/team/:teamId', updateTeam);
router.delete('/party/:id/team/:teamId', deleteParty);

module.exports = router