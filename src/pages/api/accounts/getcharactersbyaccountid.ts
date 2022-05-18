import { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'src/database/instance';
import apiHandler from 'src/middleware/apiHandler';

//TODO: accept query parameters to pull only required data

const get = async (req: NextApiRequest, res: NextApiResponse) => {
  const characters = await prisma.players.findMany({
    where: {
      account_id: Number(req.query.id),
    },
  });

  if (!characters) {
    return res.json({ success: false, message: 'Account has no characters' });
  }

  res.status(200).json({ success: true, args: { characters } });
};

export default apiHandler({
  get,
});
