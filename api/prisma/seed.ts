import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.vehicle.createMany({
    data: [
      { name: 'Adder', plate: 'ADDER001', color: 'White' },
      { name: 'Akuma', plate: 'AKUMA002', color: 'Black' },
      { name: 'Alpha', plate: 'ALPHA003', color: 'Silver' },
      { name: 'Ardent', plate: 'ARDENT004', color: 'Green' },
      { name: 'Asea', plate: 'ASEA005', color: 'Yellow' },
      { name: 'Autarch', plate: 'AUTARCH006', color: 'Orange' },
      { name: 'Bagger', plate: 'BAGGER007', color: 'Purple' },
    ],
  });

  console.log('Veículos adicionados com sucesso');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });