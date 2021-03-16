import {Request, Response} from 'express';
import { Tag } from '../models';
import createConnection from '../utils/createConnection';

const getTags = async (req: Request, res: Response) => {
  const connection = await createConnection();
  const repository = await connection.getRepository('tags');
  const tags: Tag[] = await repository.find();
  return res.status(200).send({
    message: 'ok',
    tags,
  });
};

const getTag = async (req: Request, res: Response) => {
  const { params } = req;
  const connection = await createConnection();
  const repository = await connection.getRepository('tags');
  const tag = await repository.findById(params.id);
  return res.status(200).send({
    message: 'ok',
    tag,
  });
};

const postTag = async (req: Request, res: Response) => {
  const { body } = req;
  const connection = await createConnection();
  const repository = await connection.getRepository('tags');
  const tag = await repository.createTag(body);
  await repository.save(tag);
  console.log('Saved: ' + JSON.stringify(tag));
  return res.status(200).send({
    message: 'ok',
    tag,
  });
};

const patchTag = async (req: Request, res: Response) => {
  const { params, body } = req;
  const connection = await createConnection();
  const repository = await connection.getRepository('tags');
  const tag = await repository.findById(params.id);
  if (!tag) {
    return res.status(404).send({
      error: 'tag not found',
    });
  }

  if (body.title) {
    tag.title = body.title;
  }

  if (body.musicId) {
    tag.musicId = body.musicId;
  }

  if (body.platform) {
    tag.platform = body.platform;
  }

  await repository.save(tag);
  console.log('Update: ' + JSON.stringify(tag));
  return res.status(200).send({
    message: 'ok',
    tag,
  });
};

const deleteTag = async (req: Request, res: Response) => {
  const { params } = req;
  const connection = await createConnection();
  const repository = await connection.getRepository('tags');
  try {
    await repository.delete(params.id);
    const tags = await repository.find();
    console.log('Deleted: ' + params.id);
    return res.status(200).send({
      message: 'ok',
      tags,
    });
  } catch (e) {
    return res.status(404).send({
      error: `${e.message}`,
    });
  }
};

module.exports = {
  getTags,
  getTag,
  postTag,
  patchTag,
  deleteTag,
};
