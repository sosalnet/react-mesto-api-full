const router = Router();
const { login, createUser } = require('./controllers/users');
const { celebrateCreateUser, celebrateLoginUser } = require('./validators/users');

router.post('/signin', celebrateLoginUser, login);
router.post('/signup', celebrateCreateUser, createUser);