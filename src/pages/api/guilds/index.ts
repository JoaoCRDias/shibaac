import { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'src/database/instance';
import apiHandler from 'src/middleware/apiHandler';

const get = async (req: NextApiRequest, res: NextApiResponse) => {
  const guilds = await prisma.guilds.findMany({
    include: {
      _count: {
        select: {
          guild_membership: true,
        },
      },
    },
  });
  res.json({ success: true, args: { guilds } });
};

export default apiHandler({
  get,
});
