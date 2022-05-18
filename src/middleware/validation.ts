import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { ObjectShape, OptionalObjectSchema } from 'yup/lib/object';

export function validate(
  schema: OptionalObjectSchema<ObjectShape>,
  handler: NextApiHandler
) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.body) {
      try {
        req.body = await schema
          .camelCase()
          .validate(req.body, { abortEarly: false, stripUnknown: false });
      } catch (yupError: any) {
        return res
          .status(400)
          .json({ success: false, message: yupError.errors.join(', ') });
      }
    }
    await handler(req, res);
  };
}
