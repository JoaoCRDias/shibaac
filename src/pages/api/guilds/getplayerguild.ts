import { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'src/database/instance';
import apiHandler from 'src/middleware/apiHandler';

//TODO: accept query parameters to pull only required data

const get = async (req: NextApiRequest, res: NextApiResponse) => {
  const rank_id = await prisma.guild_membership.findFirst({
    where: {
      player_id: Number(req.query.id),
    },
  });

  if (!rank_id) {
    return res.json({ success: false, message: 'Character has no guild' });
  }

  res.status(200).json({ success: true, args: { rank_id } });
};

export default apiHandler({
  get,
});
