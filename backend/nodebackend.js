const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

const sequelize = new Sequelize('chat_accounts', 'root', 'Nithya9404*', {
  host: 'localhost',
  dialect: 'mysql',
});

const Account = sequelize.define('chat_accounts', {
 username:{
    type: DataTypes.CHAR,
    allowNull:false,
    unique:true,
    primaryKey:true,
 },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, { timestamps: false }); // Add { timestamps: false } to disable timestamps for the model

sequelize.authenticate()
  .then(() => {
    console.log('Database connected');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

app.post('/chat_accounts', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const account = await Account.create({
      username,
      email,
      password,
    });

    res.status(201).json({ message: 'Account created successfully' });
  } catch (error) {
    console.error('An error occurred during account creation:', error);
    res.status(500).json({ message: 'Failed to create account' });
  }
});

app.post('/chat_accounts/login', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const account = await Account.findOne({
      where: { username, email, password },
    });

    if (account) {
      res.status(200).json({ message: 'Login successful' });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('An error occurred during login:', error);
    res.status(500).json({ message: 'An error occurred during login' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
