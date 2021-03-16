import {Request, Response} from 'express';
const BASE_URL = 'https://api.qrserver.com/v1/create-qr-code';

interface qrSearchParams {
  data?: string;
  size?: string;
}

const getCreate = async (req: Request, res: Response) => {
  const { query } = req;
  const { data, size } = query;

  const searchParams: qrSearchParams = {};

  if (!data) {
    return res.send({
      error: 'data field missing',
    });
  }

  searchParams.data = data as string;
  if (size) {
    searchParams.size = size as string;
  }

  const qrUrl = `${BASE_URL}/?${new URLSearchParams(searchParams as string[][])}`;
  return res.status(200).send({
    message: 'ok',
    qrUrl,
  });
};

export {
  getCreate
};
