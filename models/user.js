const users = [];

function getAllUsers() {
  return users;
}

function addUser(user) {
  users.push(user);
}

function confirmLogin(username, password) {
  return users.some(user => user.username === username && user.password === password);
}

module.exports = {
  getAllUsers,
  addUser,
  confirmLogin,
};