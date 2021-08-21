import axios from 'axios';

import { Tag } from '../models';

const BASE_URL =
  process.env.REACT_APP_ONGAKU_SERVER_API || 'http://localhost:8888/api';

const client = axios.create({
  baseURL: BASE_URL,
});

export const getTag = async (tagId: string): Promise<Tag> => {
  const response = await client.get(`/tag/${tagId}`);

  return response.data;
};

export const getTags = async (): Promise<Tag[]> => {
  const response = await client.get(`/tags/`);

  return response.data.tags;
};

export const postTag = async (newTag: Tag): Promise<Tag> => {
  const response = await client.post(`/tag/`, newTag);

  return response.data.tag;
};

export const patchTag = async (modifyTag: Tag): Promise<Tag> => {
  const response = await client.patch(`/tag/${modifyTag.tagId}`, modifyTag);

  return response.data.tag;
};

export const deleteTag = async (deleteTag: Tag): Promise<Tag[]> => {
  const response = await client.delete(`/tag/${deleteTag.tagId}`);

  return response.data.tags;
};

export const playMusic = async (tag: Tag): Promise<void> => {
  const response = await client.get(`/music/play/${tag.tagId}`);

  return response.data;
};
