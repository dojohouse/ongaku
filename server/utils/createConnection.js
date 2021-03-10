const fs = require('fs');
const uuid = require('uuid');
const uuidv4 = uuid.v4;

const TAGS_COLLECTION = './data/tags.json';

class TagRepository {
  async createTag(properties) {
    const tag = {};
    tag.tag_id = uuidv4();
    tag.music_id = '';
    tag.platform = '';

    if (!properties) {
      return tag;
    }

    tag.music_id = properties.music_id || '';
    tag.platform = properties.platform || '';
    return tag;
  }

  async find() {
    const response = await fs.promises.readFile(TAGS_COLLECTION);
    return JSON.parse(response.toString())
  }

  async findById(id) {
    const tags = await this.find();
    return tags.filter((tag) => tag.tag_id === id);
  }

  async save(tag) {
    const response = await fs.promises.readFile(TAGS_COLLECTION);
    const tags = JSON.parse(response.toString());
    tags.push(tag);
    await fs.promises.writeFile(TAGS_COLLECTION, JSON.stringify(tags, null, 2));
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