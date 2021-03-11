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
    const tag = tags.filter((tag) => tag.tag_id === id);
    return tag.length === 1 ? tag[0] : null;
  }

  async save(tag) {
    const response = await fs.promises.readFile(TAGS_COLLECTION);
    const tags = JSON.parse(response.toString());
    const index = tags.findIndex(t => t.tag_id === tag.tag_id);

    // Add new tag or modify existing
    if (index < 0) {
      tags.push(tag);
    } else {
      tags[index].music_id = tag.music_id || tags[index].music_id;
      tags[index].platform = tag.platform || tags[index].platform;
    }

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