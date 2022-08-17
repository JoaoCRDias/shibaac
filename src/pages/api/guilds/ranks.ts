import { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'src/database/instance';
import apiHandler from 'src/middleware/apiHandler';

const put = async (req: NextApiRequest, res: NextApiResponse) => {
  const { playerId, rankId } = req.body;
  try {
    await prisma.$transaction(async (prisma) => {
      console.log(
        '*************rankid',
        Number(rankId),
        rankId,
        Number(playerId),
        playerId
      );
      const update = await prisma.guild_membership.update({
        where: {
          player_id: Number(playerId),
        },
        data: {
          rank_id: Number(rankId),
        },
      });
      console.log('*********update', update);
      res.status(201).json({ success: true });
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ success: false });
  }
};

export default apiHandler({
  put,
});
