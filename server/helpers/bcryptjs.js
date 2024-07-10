var bcrypt = require('bcryptjs');

var salt = bcrypt.genSaltSync(10);
const hashPassword = (value) => bcrypt.hashSync(value, salt);
const checkPassword = (value,value2) => bcrypt.compareSync(value, value2);

module.exports = {hashPassword,checkPassword}