interface Car {
  id: number;
  name: string;
  model: string;
  color: string;
  plate: string;
  imageUrl: string;
}

interface CarCardProps {
  car: Car;
  onSelectCar: (carPlate: string) => void;
}

export function Card({ car, onSelectCar }: CarCardProps) {
  return (
    <div key={car.id} className="bg-gray-700 rounded-lg w-48 p-4 text-center">
      <img src={`https://docs.fivem.net/vehicles/${car.model}.webp`} alt={`${car.model}`} className="rounded-lg mb-4" />
      <div className="text-center">
        <h3 className="text-lg font-semibold">{car.name}</h3>
        <p className="text-sm">Modelo: {car.model}</p>
        <p className="text-sm">Cor: {car.color}</p>
        <p className="text-sm">Placa: {car.plate}</p>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-2"
          onClick={() => onSelectCar(car.plate)}
        >
          Selecionar
        </button>
      </div>
    </div>
  );
}