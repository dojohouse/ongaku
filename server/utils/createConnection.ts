import fs from 'fs';
import {v4 as uuidv4} from 'uuid';

const TAGS_COLLECTION = './data/tags.json';

interface Tag {
  tagId: string;
  title: string;
  musicId: string;
  platform: '' | 'spotify';
}

class TagRepository {
  async createTag(properties?: Tag): Promise<Tag> {
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
      title: properties.title || '',
      musicId: properties.musicId || '',
      platform: properties.platform || '',
    };
  }

  async find(): Promise<Tag[]> {
    const response = await fs.promises.readFile(TAGS_COLLECTION);
    return JSON.parse(response.toString());
  }

  async findById(id: string): Promise<Tag | null> {
    const tags = await this.find();
    const tag = tags.filter((tag: Tag) => tag.tagId === id);
    return tag.length === 1 ? tag[0] : null;
  }

  async save(tag: Tag): Promise<void> {
    const response = await fs.promises.readFile(TAGS_COLLECTION);
    const tags: Tag[] = JSON.parse(response.toString());
    const index = tags.findIndex((t: Tag) => t.tagId === tag.tagId);

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

  async delete(tagId: string): Promise<void> {
    const response = await fs.promises.readFile(TAGS_COLLECTION);
    const tags: Tag[] = JSON.parse(response.toString());
    const removeDeleteTagInList = tags.filter((t: Tag) => t.tagId !== tagId);
    if (tags.length === removeDeleteTagInList.length) {
      throw Error('Invalid Tag Id.');
    }

    await fs.promises.writeFile(
      TAGS_COLLECTION,
      JSON.stringify(removeDeleteTagInList, null, 2),
    );
  }
}

class Connection {
  async getRepository(name: string) {
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
