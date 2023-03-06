const express = require('express');

const app = express();

app.use(express.json());

const Database = require('./database');

const database = new Database();

app.post('/users', (req, res) => {
  const { body } = req;

  const {
    name,
    sureName,
  } = body;

  const user = {
    name,
    sureName,
  }

  const insertedUser = database.addUser({ ...user, links: [] })

  return res.send(insertedUser)
})

app.get('/users', (req, res) => {
  const users = database.getUsers();

  return res.send(users)
});


app.get('/users/:userId', (req, res) => {
  const { params } = req;

  const { userId } = params;

  const user = database.getUser(userId);

  if (!user) {
    return res.status(404).send({ error: 'User not found' });
  }


  return res.send({ userLinks: user.links ?? [] })
})


app.patch('/users/:userId/links', (req, res) => {
  const { params, body } = req;
  const { userId } = params;

  const user = database.getUser(userId);

  if (!user) {
    return res.status(404).send({ error: 'User not found' });
  }

  const { originalLink } = body;

  const link = database.addLink(originalLink);
  const updatedUser = database.addUserLink(userId, link);


  return res.send(updatedUser)
});


app.get('/links/:shortLink', (req, res) => {
  const { params } = req;
  const { shortLink } = params;

  const link = database.getLinkByShortLink(shortLink);

  if (!link) {
    return res.status(404).send({ error: 'Link not found' });
  }

  return res.redirect(link.original);
});





app.listen(3000);