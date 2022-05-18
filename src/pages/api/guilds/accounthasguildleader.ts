import { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'src/database/instance';
import apiHandler from 'src/middleware/apiHandler';

//TODO: accept query parameters to pull only required data

const get = async (req: NextApiRequest, res: NextApiResponse) => {
  const leader = await prisma.guild_membership.count({
    where: {
      guild_ranks: { level: 3 },
      players: { account_id: Number(req.query.id) },
    },
  });

  if (!leader) {
    return res.json({
      success: false,
      message: 'Account has no leader of guild',
    });
  }

  res.status(200).json({ success: true, args: { leader } });
};

export default apiHandler({
  get,
});
