// common/accesscontrol/roles.js
const AccessControl = require('accesscontrol');
const ac = new AccessControl();

ac.grant('customer').readOwn('profile').readAny('book');

ac.grant('editor').extend('customer').createAny('book').updateAny('book');

ac.grant('admin').extend('editor').deleteAny('book').updateAny('user');

module.exports = ac;
