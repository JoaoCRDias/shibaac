import { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'src/database/instance';
import apiHandler from 'src/middleware/apiHandler';

//TODO: accept query parameters to pull only required data

const get = async (req: NextApiRequest, res: NextApiResponse) => {
  const guild = await prisma.guilds.findFirst({
    where: {
      id: Number(req.query.id),
    },
    include: {
      guild_membership: {
        include: {
          players: { select: { name: true, level: true, vocation: true } },
        },
      },
    },
  });

  if (!guild) {
    return res.json({ success: false, message: 'Guild not found' });
  }

  res.status(200).json({ success: true, args: { guild } });
};

export default apiHandler({
  get,
});
