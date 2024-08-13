import { PrismaClient } from '@prisma/client';

class Seeder {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public async seedVehicles() {
    try {
      await this.prisma.vehicle.createMany({
        data: [
          { name: 'Adder', plate: 'ADDER001', color: '255,255,255', model: 'adder', category: 'super' },
          { name: 'Akuma', plate: 'AKUMA002', color: '0,0,0', model: 'akuma', category: 'motorcycles' },
          { name: 'Alpha', plate: 'ALPHA003', color: '192,192,192', model: 'alpha', category: 'sports' },
          { name: 'Ardent', plate: 'ARDENT04', color: '0,128,0', model: 'ardent', category: 'sportsclassics' },
          { name: 'Asea', plate: 'ASEA_005', color: '255,255,0', model: 'asea', category: 'sedans' },
          { name: 'Autarch', plate: 'AUTARCH0', color: '255,165,0', model: 'autarch', category: 'super' },
          { name: 'Bagger', plate: 'BAGGER07', color: '128,0,128', model: 'bagger', category: 'motorcycles' },
          { name: 'Buffalo', plate: 'BUFFALO0', color: '255,0,0', model: 'buffalo', category: 'sports' },
          { name: 'Buffalo S', plate: 'BUFFALO_', color: '0,0,255', model: 'buffalo2', category: 'sports' },
          { name: 'Carbonizzare', plate: 'CARBONIZ', color: '128,128,128', model: 'carbonizzare', category: 'sports' },
          { name: 'Carbon RS', plate: 'CARBONRS', color: '0,0,0', model: 'carbonrs', category: 'motorcycles' },
          { name: 'Casco', plate: 'CASCO012', color: '165,42,42', model: 'casco', category: 'sportsclassics' },
          { name: 'Cavalcade', plate: 'CAVALCAD', color: '0,128,0', model: 'cavalcade2', category: 'suvs' },
          { name: 'Cheetah', plate: 'CHEETAH0', color: '255,255,0', model: 'cheetah', category: 'super' },
          { name: 'Chimera', plate: 'CHIMERA0', color: '255,0,0', model: 'chimera', category: 'motorcycles' },
          { name: 'Fhantom', plate: 'FHANTOM0', color: '192,192,192', model: 'fq2', category: 'suvs' },
          { name: 'Fugitive', plate: 'FUGITIVE', color: '0,0,255', model: 'fugitive', category: 'sedans' },
          { name: 'Furore GT', plate: 'FUROREGT', color: '128,0,128', model: 'furoregt', category: 'sports' },
          { name: 'Fusilade', plate: 'FUSILADE', color: '0,0,0', model: 'fusilade', category: 'sports' },
          { name: 'Gargoyle', plate: 'GARGOYLE', color: '128,128,128', model: 'gargoyle', category: 'motorcycles' },
        ],
      });

      console.log('Veículos adicionados com sucesso');
    } catch (error) {
      console.error('Erro ao adicionar veículos:', error);
      process.exit(1);
    } finally {
      await this.prisma.$disconnect();
    }
  }
}

const seeder = new Seeder();
seeder.seedVehicles();