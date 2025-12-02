const bcrypt = require('bcryptjs');
const userModel = require('../models/user.model');
const jwtUtil = require('../utils/jwt.util');

async function login(req, res) {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ message: 'username and password required' });

  try {
    const user = await userModel.findByUsername(username);
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const match = bcrypt.compareSync(password, user.password);
    if (!match) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwtUtil.sign({ id: user.id, username: user.username, role: user.role });
    res.json({ token, user: { id: user.id, username: user.username, name: user.name, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: 'Login error', error: err.message });
  }
}

module.exports = { login };
