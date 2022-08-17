import { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'src/database/instance';
import apiHandler from 'src/middleware/apiHandler';

//TODO: accept query parameters to pull only required data

const verifyPlayerIsInGuild = async (playerId: number) => {
  const isInGuild = await prisma.guild_membership.findUnique({
    where: {
      player_id: playerId,
    },
  });
  if (isInGuild) return true;
  return false;
};

const get = async (req: NextApiRequest, res: NextApiResponse) => {
  const invitations = await prisma.guild_invites.findMany({
    where: {
      guild_id: Number(req.query.id),
    },
    include: {
      players: {
        select: { name: true, level: true, vocation: true },
      },
    },
  });

  if (!invitations) {
    return res.json({ success: false, message: 'Guild not found' });
  }

  res.status(200).json({ success: true, args: { invitations } });
};

const post = async (req: NextApiRequest, res: NextApiResponse) => {
  const { guildId, name } = req.body;
  const player = await prisma.players.findUnique({
    where: { name },
  });
  if (player) {
    try {
      const isInGuild = await verifyPlayerIsInGuild(player.id);
      if (isInGuild) {
        res
          .status(400)
          .json({ success: false, message: 'Player already in guild' });
        return;
      }

      await prisma.guild_invites.create({
        data: {
          guild_id: Number(guildId),
          player_id: Number(player.id),
          date: 0,
        },
      });
      res.status(201).json({ success: true });
    } catch (e) {
      console.error(e);
      res.status(400).json({ success: false });
    }
  } else {
    res.status(400).json({ success: false, message: 'Player not exists' });
  }
};

const deleteInvitation = async (req: NextApiRequest, res: NextApiResponse) => {
  const { guildId, playerId } = req.body;
  try {
    const deleteInvitation = await prisma.guild_invites.delete({
      where: {
        player_id_guild_id: {
          guild_id: Number(guildId),
          player_id: Number(playerId),
        },
      },
    });
    console.log('deleteResponde:', deleteInvitation);
    res.status(200).json({ success: true, message: 'Deleted succesfully' });
  } catch (e) {
    res.status(400).json({ success: false });
  }
};

const put = async (req: NextApiRequest, res: NextApiResponse) => {
  const { guildId, playerId } = req.body;
  console.log('bate aqui');
  try {
    await prisma.$transaction(async (prisma) => {
      await prisma.guild_invites.delete({
        where: {
          player_id_guild_id: {
            guild_id: Number(guildId),
            player_id: Number(playerId),
          },
        },
      });

      const memberRank = await prisma.guild_ranks.findFirst({
        where: {
          guild_id: Number(guildId),
          level: 3,
        },
      });

      await prisma.guild_membership.create({
        data: {
          guild_id: Number(guildId),
          player_id: Number(playerId),
          rank_id: memberRank?.id as number,
        },
      });
      res.status(201).json({ success: true });
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ success: true });
  }
};

export default apiHandler({
  get,
  post,
  delete: deleteInvitation,
  put,
});
