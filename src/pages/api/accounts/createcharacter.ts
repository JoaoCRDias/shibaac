import { withSessionRoute } from 'src/util/session';
import { NextApiRequest, NextApiResponse } from 'next';
import { validate } from 'src/middleware/validation';
import { createCharacterSchema } from 'src/schemas/CreateCharacter';
import prisma from 'src/database/instance';
import apiHandler from 'src/middleware/apiHandler';
import { newChar } from 'src/constants/constants';

const post = withSessionRoute(
  async (req: NextApiRequest, res: NextApiResponse) => {
    console.log(req);
    const user = req.session.user;
    if (!user) {
      return res.status(403).json({ message: 'Not authorised.' });
    }

    const { name, vocation, sex } = req.body;

    const count = await prisma.players.count({
      where: { name },
    });

    if (count !== 0) {
      return res.json({
        success: false,
        message: 'Character with that name already exists',
      });
    }

    const character = await prisma.players.create({
      data: {
        ...newChar,
        name,
        account_id: user.id,
        vocation: parseInt(vocation),
        sex: parseInt(sex),
      },
    });

    if (character) {
      res.json({ success: true, message: 'Succesfully created character.' });
    } else {
      res.json({ success: true, message: "Couldn't create character." });
    }
  }
);

export default apiHandler({
  post: validate(createCharacterSchema, post),
});
