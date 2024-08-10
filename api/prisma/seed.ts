import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const adminPlayer = await prisma.player.create({
    data: {
      name: 'Admin User',
      isAdmin: true,
      vehicles: {
        create: [
          {
            plate: 'ADMIN123',
            color: 'Black',
            owner: 'Admin User',
          },
        ],
      },
    },
  });

  const normalPlayer = await prisma.player.create({
    data: {
      name: 'John Doe',
      isAdmin: false,
      vehicles: {
        create: [
          {
            plate: 'ABC1234',
            color: 'Red',
            owner: 'John Doe',
          },
          {
            plate: 'XYZ5678',
            color: 'Blue',
            owner: 'John Doe',
          },
        ],
      },
    },
  });

  console.log({ adminPlayer, normalPlayer });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });