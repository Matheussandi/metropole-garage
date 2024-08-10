import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.vehicle.createMany({
    data: [
      { name: 'Adder', plate: 'ADDER001', color: 'White', model: 'adder', category: 'super' },
      { name: 'Akuma', plate: 'AKUMA002', color: 'Black', model: 'AKUMA', category: 'motorcycles' },
      { name: 'Alpha', plate: 'ALPHA003', color: 'Silver', model: 'alpha', category: 'sports' },
      { name: 'Ardent', plate: 'ARDENT004', color: 'Green', model: 'ardent', category: 'sportsclassics' },
      { name: 'Asea', plate: 'ASEA005', color: 'Yellow', model: 'asea', category: 'sedans' },
      { name: 'Autarch', plate: 'AUTARCH006', color: 'Orange', model: 'autarch', category: 'super' },
      { name: 'Bagger', plate: 'BAGGER007', color: 'Purple', model: 'bagger', category: 'motorcycles' },
      { name: 'Buffalo', plate: 'BUFFALO008', color: 'Red', model: 'buffalo', category: 'sports' },
      { name: 'Buffalo S', plate: 'BUFFALO_S009', color: 'Blue', model: 'buffalo2', category: 'sports' },
      { name: 'Carbonizzare', plate: 'CARBONIZZARE010', color: 'Gray', model: 'carbonizzare', category: 'sports' },
      { name: 'Carbon RS', plate: 'CARBON_RS011', color: 'Black', model: 'carbonrs', category: 'motorcycles' },
      { name: 'Casco', plate: 'CASCO012', color: 'Brown', model: 'casco', category: 'sportsclassics' },
      { name: 'Cavalcade', plate: 'CAVALCADE013', color: 'Green', model: 'cavalcade2', category: 'suvs' },
      { name: 'Cheetah', plate: 'CHEETAH014', color: 'Yellow', model: 'cheetah', category: 'super' },
      { name: 'Chimera', plate: 'CHIMERA015', color: 'Red', model: 'chimera', category: 'motorcycles' },
      { name: 'Fhantom', plate: 'Fhantom016', color: 'Silver', model: 'fq2', category: 'suvs' },
      { name: 'Fugitive', plate: 'FUGITIVE017', color: 'Blue', model: 'fugitive', category: 'sedans' },
      { name: 'Furore GT', plate: 'FUROREGT018', color: 'Purple', model: 'furoregt', category: 'sports' },
      { name: 'Fusilade', plate: 'FUSILADE019', color: 'Black', model: 'fusilade', category: 'sports' },
      { name: 'Gargoyle', plate: 'GARGOYLE020', color: 'Gray', model: 'gargoyle', category: 'motorcycles' },
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
