const createConnection = require('../utils/createConnection');

const getTags = async (req, res) => {
  const connection = await createConnection();
  const repository = await connection.getRepository('tags');
  const tags = await repository.find();
  return res.status(200).send({
    message: 'ok',
    tags,
  });
};

const getTag = async (req, res) => {
  const { params } = req;
  const connection = await createConnection();
  const repository = await connection.getRepository('tags');
  const tag = await repository.findById(params.id);
  return res.status(200).send({
    message: 'ok',
    tag,
  });
};

const postTag = async (req, res) => {
  const { body } = req;
  const connection = await createConnection();
  const repository = await connection.getRepository('tags');
  const tag = await repository.createTag(body);
  await repository.save(tag);
  console.log("Saved: " + JSON.stringify(tag));
  return res.status(200).send({
    message: 'ok',
    tag,
  });
};

const patchTag = async (req, res) => {
  const { params, body } = req;
  const connection = await createConnection();
  const repository = await connection.getRepository('tags');
  const tag = await repository.findById(params.id);
  if (!tag) {
    return res.status(404).send({
      message: 'tag not found',
      tag: null,
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
  console.log("Update: " + JSON.stringify(tag));
  return res.status(200).send({
    message: 'ok',
    tag,
  });
};

module.exports = {
  getTags,
  getTag,
  postTag,
  patchTag,
};
