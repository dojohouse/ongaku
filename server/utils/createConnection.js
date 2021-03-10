const fs = require('fs');

const TAGS_COLLECTION = './data/tags.json';

class TagRepository {
  async find() {
    const response = await fs.promises.readFile(TAGS_COLLECTION);
    return JSON.parse(response.toString())
  }

  async findById(id) {
    const tags = await this.find();
    return tags.filter((tag) => tag.tag_id === id);
  }
}

class Connection {
  async getRepository(name) {
    if (name.toLocaleLowerCase() === 'tags') {
      return new TagRepository();
    }
    return {};
  }
}

const createConnection = async() => {
  return new Connection();
};

module.exports = createConnection;