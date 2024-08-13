import { useEffect, useState } from "react";

import axios from "axios";

import { fetchNui } from "../utils/fetchNui";

import { Pagination } from "../components/Pagination";
import { Card } from "../components/Card";

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
  const [carsPerPage] = useState<number>(6);

  async function fetchCars() {
    try {
      const response = await axios.get("http://localhost:3333/vehicles");
      setCars(response.data);
    } catch (error) {
      console.error("Erro ao buscar os carros:", error);
    }
  }

  async function handleSelectCar(carPlate: string) {
    try {
      await fetchNui('respawnVehicle', { plate: carPlate });
      handleCloseNui();
    } catch (error) {
      console.error("Erro ao respawnar o carro:", error);
    }
  }

  async function handleCloseNui() {
    fetchNui("close-nui", { setIsVisible: false })
      .then((retData) => {
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
          <div className="flex flex-wrap justify-center">
            {currentCars.map((car) => (
              <Card
                key={car.id}
                car={car}
                onSelectCar={handleSelectCar}
              />
            ))}
          </div>
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
}