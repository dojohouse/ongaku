const BASE_URL = 'https://api.qrserver.com/v1/create-qr-code';

const getCreate = async (req, res) => {
  const { query } = req;
  const { data, size } = query;

  const searchParams = {};
  if (!data) {
    return res.send({
      error: 'data field missing',
    });
  }

  searchParams.data = data;
  if (size) {
    searchParams.size = size;
  }

  const qrUrl = `${BASE_URL}/?${new URLSearchParams(searchParams)}`;
  return res.status(200).send({
    message: 'ok',
    qrUrl,
  });
};

module.exports = {
  getCreate,
};
