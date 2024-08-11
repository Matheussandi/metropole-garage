import { useEffect, useState } from "react";

import { fetchNui } from "../utils/fetchNui";

import axios from "axios";

import "./App.css";

interface Car {
  id: number;
  name: string;
  model: string;
  color: string;
  plate: string;
  imageUrl: string;
}

export default function App() {
  const [cars, setCars] = useState<Car[]>([]);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [carsPerPage] = useState<number>(8);

  async function fetchCars() {
    try {
      const response = await axios.get("http://localhost:3333/vehicles");
      const carsWithImages = response.data.map((car: Car, index: number) => ({
        ...car,
        imageUrl: `https://via.placeholder.com/200?text=Carro+${index + 1}`,
      }));
      setCars(carsWithImages);
    } catch (error) {
      console.error("Erro ao buscar os carros:", error);
    }
  }

  async function handleSelectCar(carPlate: string) {
    try {
      const response = await axios.post(`http://localhost:3333/vehicles/respawn`, {
        plate: carPlate,
      });

      if (response.status === 200) {
        console.log(`Carro com a placa ${carPlate} foi respawnado com sucesso.`);
      } else {
        console.error(`Erro ao respawnar o carro com a placa ${carPlate}.`);
      }
    } catch (error) {
      console.error("Erro ao fazer a requisição:", error);
    }
  }

  async function handleCloseNui() {
    fetchNui("hideFrame", { setIsVisible: false })
      .then((retData) => {
        console.log("Got return data from client scripts:");
        console.dir(retData);
        setIsVisible(false);
      })
      .catch((e) => {
        console.error("Setting mock data due to error", e);
      });
  }

  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = cars.slice(indexOfFirstCar, indexOfLastCar);
  const totalPages = Math.ceil(cars.length / carsPerPage);

  useEffect(() => {
    if (isVisible) {
      fetchCars();
    }
  }, [isVisible]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.action === "setVisible") {
        setIsVisible(event.data.data);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="flex justify-center items-center h-full text-center">
      <div className="bg-gray-900 rounded-lg w-9/12 h-5/6 p-8 flex flex-col justify-center items-center text-white overflow-auto relative">
        <button
          className="absolute top-2 right-2 text-white text-2xl"
          onClick={handleCloseNui}
        >
          &times;
        </button>
        <div className="overflow-y-auto scrollbar-thin scrollbar-thumb-rounded">
          <h2 className="text-2xl mb-6">Carros Disponíveis</h2>
          <div className="flex flex-wrap gap-4 justify-center">
            {currentCars.map((car) => (
              <div key={car.id} className="bg-gray-700 rounded-lg w-48 p-4 text-center">
                <img src={car.imageUrl} alt={`${car.model}`} className="rounded-lg mb-4" />
                <div className="text-center">
                  <h3 className="text-lg font-semibold">{car.name}</h3>
                  <p className="text-sm">Modelo: {car.model}</p>
                  <p className="text-sm">Cor: {car.color}</p>
                  <p className="text-sm">Placa: {car.plate}</p>
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-2"
                    onClick={() => handleSelectCar(car.plate)}
                  >
                    Selecionar
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-center">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => setCurrentPage(index + 1)}
                className={`mx-2 px-4 py-2 rounded border ${currentPage === index + 1
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-800 text-blue-500'
                  }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}