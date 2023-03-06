const { uuid } = require('uuidv4');

class Database {
  links = {};
  users = [];

  addUser(user) {
    const id = uuid();

    const newUser = { ...user, id };
    this.users.push(newUser);

    return newUser;
  }

  addLink(originalLink) {
    const foundLink = this.getLinkByOriginalUrl(originalLink);

    if (foundLink) {
      return foundLink;
    }

    const short = uuid();

    const newLink = {
      short: short,
      original: originalLink,
    }

    this.links[short] = newLink;

    return newLink;
  }

  addUserLink(userId, link) {
    const user = this.users.find((user) => user.id === userId);

    const alreadyAdded = user.links.find((userLink) => userLink.original === link.original);

    if (alreadyAdded) {
      return user;
    }

    user.links = [...user.links, link];

    return user;
  }

  getUsers() {
    return this.users;
  }

  getLinkByOriginalUrl(originalLink) {
    const keys = Object.keys(this.links);

    for (const linkKey of keys) {
      if (this.links[linkKey].original === originalLink) {
        return this.links[linkKey];
      }
    }

    return false;
  }

  getLinkByShortLink(link) {
    const foundLink = this.links[link]

    if (!foundLink) {
      return null;
    }

    return foundLink;
  }





  getUser(userId) {
    const user = this.users.find(user => user.id === userId);

    if (!user) {
      return null;
    }

    return user;
  }
}

module.exports = Database;