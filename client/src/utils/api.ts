import axios from 'axios';

import { Tag } from '../models';

const API_HOST = process.env.REACT_APP_BACKEND_HOST || 'localhost';
const API_PORT = process.env.REACT_APP_BACKEND_PORT || 8888
const BASE_URL = `http://${API_HOST}:${API_PORT}/api`;

const client = axios.create({
  baseURL: BASE_URL,
});

export const getTag = async (tagId: string): Promise<Tag> => {
  const response = await client.get(`/tag/${tagId}`)

  return response.data;
}

export const getTags = async (): Promise<Tag[]> => {
  const response = await client.get(`/tags/`)

  return response.data.tags;
}

export const postTag = async (newTag: Tag): Promise<Tag> => {
  const response = await client.post(`/tag/`, newTag)

  return response.data.tag
}