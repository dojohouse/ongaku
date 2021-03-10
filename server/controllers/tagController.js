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
}

const createTag = async (req, res) => {
  const connection = await createConnection();
  const repository = await connection.getRepository('tags');
  const tag = await repository.createTag();
  await repository.save(tag);
  return res.status(200).send({
    message: 'ok',
    tag,
  });
}

module.exports = {
  getTags,
  getTag,
  createTag,
};
