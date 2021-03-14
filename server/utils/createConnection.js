const fs = require('fs');
const uuid = require('uuid');
const uuidv4 = uuid.v4;

const TAGS_COLLECTION = './data/tags.json';

class TagRepository {
  async createTag(properties) {
    if (!properties) {
      return {
        tagId: uuidv4(),
        title: '',
        musicId: '',
        platform: '',
      };
    }
    return {
      tagId: properties.tagId || uuidv4(),
      title:  properties.title || '',
      musicId:  properties.musicId || '',
      platform:  properties.platform || '',
    }
  }

  async find() {
    const response = await fs.promises.readFile(TAGS_COLLECTION);
    return JSON.parse(response.toString());
  }

  async findById(id) {
    const tags = await this.find();
    const tag = tags.filter((tag) => tag.tagId === id);
    return tag.length === 1 ? tag[0] : null;
  }

  async save(tag) {
    const response = await fs.promises.readFile(TAGS_COLLECTION);
    const tags = JSON.parse(response.toString());
    const index = tags.findIndex((t) => t.tagId === tag.tagId);

    // Add new tag or modify existing
    if (index < 0) {
      tags.push(tag);
    } else {
      tags[index].musicId = tag.musicId || tags[index].musicId;
      tags[index].platform = tag.platform || tags[index].platform;
      tags[index].title = tag.title || tags[index].title;
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

const createConnection = async () => {
  return new Connection();
};

module.exports = createConnection;
