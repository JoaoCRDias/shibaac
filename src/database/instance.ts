import { PrismaClient } from '@prisma/client';
import { dev } from 'src/util/config';

declare global {
  // allow global `var` declarations
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

const prisma =
  global.prisma ||
  new PrismaClient({
    log: [{ level: 'query', emit: 'event' }],
  });

prisma.$on('query', (e) => {
  console.log(e);
});

if (dev) {
  global.prisma = prisma;
}

export default prisma;
