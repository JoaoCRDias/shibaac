import { sha1Encrypt } from 'src/util/crypt';
import { validate } from 'src/middleware/validation';
import { registerSchema } from 'src/schemas/Register';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'src/database/instance';
import apiHandler from 'src/middleware/apiHandler';
import { createGuildSchema } from 'src/schemas/CreateGuild';

const post = async (req: NextApiRequest, res: NextApiResponse) => {
  const { name, ownerid, creationdata } = req.body;

  const count = await prisma.guilds.count({
    where: { name },
  });

  if (count !== 0) {
    return res.json({
      success: false,
      message: 'Guild with that name already exists.',
    });
  }
  console.log('*************** CREATION DATA', creationdata);
  try {
    const transaction = await prisma.$transaction(async (prisma) => {
      const guild = await prisma.guilds.create({
        data: {
          name,
          ownerid: Number(ownerid),
          creationdata: Number(creationdata),
        },
      });

      console.log('GUILD', guild);

      const rankId = await prisma.guild_ranks.findFirst({
        where: {
          guild_id: guild.id,
          level: 3,
        },
      });

      console.log('RANKID', rankId);

      const guild_membership = await prisma.guild_membership.create({
        data: {
          player_id: Number(ownerid),
          guild_id: guild.id,
          rank_id: rankId.id,
        },
      });
    });
  } catch (e) {
    console.error(e);
    return res.json({
      success: false,
      message: 'Error occured while creating guild',
    });
  }

  res.json({ success: true, message: 'Guild created successfuly' });
};

export default apiHandler({
  post: validate(createGuildSchema, post),
});
