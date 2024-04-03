const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();
const user = require('./models');
const logs = require('./logModel');
const cors = require('cors');
const Server = require('socket.io').Server;
const http = require('http');

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://192.168.0.5:5173",
        methods: ["GET", "POST"],
        credentials: true,
    }

});

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.URI)
  .then(() => {
    console.log("Connected Successfully");
    server.listen(process.env.PORT || 5000, (err) => {
      if (err) console.log(err);
      console.log(`running at port ${process.env.PORT}`);
    });
  })
  .catch((error) => console.log("Failed to connect", error));

  //APIs
  //get all logs
  app.get('/logs', async (req, res) => {
    try {
      const allLogs = await logs.find();
      res.send(allLogs);
  } catch (error) {
      console.error('Error fetching logs:', error);
      res.status(500).json({ error: 'Failed to fetch logs' });
  }
  });

  app.get('/hi', (req, res) => {
    console.log("hi");
    res.send("HI")
  });

  //get all users
app.get("/", async (req, res) => {
  const users = await user.find();
  res.send(users);
});

//create user
app.post('/', async (req, res) => {
  const name = req.body.name;
  try {
    const newUser = await user.create({
      name: name,
      balance: 1500,
      spent: {
        total: 0,
        bank: 0,
        otherPlayers: 0
      },
      recd: {
        total: 0,
        bank: 0,
        otherPlayers: 0
      }
    })
    res.send(newUser);
    io.emit('newUser');
  } catch (err) {
    console.log("error posting", err)
  }
});

//get single user
app.get('/:name', async (req, res) => {
  const name = req.params.name;
    const response = await user.findOne({name: name});
    res.send(response);
});

//pay / this user / from this user
app.patch('/pay/:to/:from/:value', async (req, res) => {
req.params.value = parseInt(req.params.value);

  //getting to
const to = await fetch(`http://192.168.0.5:8000/${req.params.to}`);
const usableTo = await to.json();

  //getting from
const from = await fetch(`http://192.168.0.5:8000/${req.params.from}`);
const usableFrom = await from.json();

  //add and subtract value
      //to
        usableTo.balance += req.params.value;
        usableTo.recd.total += req.params.value;
      //from
        usableFrom.balance -= req.params.value;
        usableFrom.spent.total += req.params.value;


  //patch to
  const updatedTo = await user.findByIdAndUpdate(usableTo._id, usableTo, {new:true});

  //patch from
  const updatedFrom = await user.findByIdAndUpdate(usableFrom._id, usableFrom, {new:true});

  //add log of this transaction
  const logStatement = `${req.params.from} --> ${req.params.to}: ${req.params.value}`
  const newLog = await logs.create(
    {
    log: logStatement
    }
  );

  io.emit('updateLogs', newLog);
  io.emit('udateUser');

  res.send("done")
}); 