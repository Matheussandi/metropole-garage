import React, { useEffect, useState } from "react";
import "./App.css";

interface Car {
  id: number;
  name: string;
  model: string;
  color: string;
  plate: string;
  imageUrl: string;
}

const App: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [carsPerPage] = useState<number>(10);

  const fetchCars = async () => {
    try {
      const response = await fetch("http://localhost:3333/vehicles");
      const data = await response.json();
      const carsWithImages = data.map((car: Car, index: number) => ({
        ...car,
        imageUrl: `https://via.placeholder.com/200?text=Carro+${index + 1}`, // Adiciona a URL da imagem simulada
      }));
      setCars(carsWithImages);
    } catch (error) {
      console.error("Erro ao buscar os carros:", error);
    }
  };

  useEffect(() => {
    if (isVisible) {
      fetchCars();
    }
  }, [isVisible]);

  const handleToggleNui = () => {
    setIsVisible(!isVisible);
  };

  const handleSelectCar = async (carPlate: string) => {
    try {
      const response = await fetch(`http://localhost:3333/vehicles/respawn`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ plate: carPlate }),
      });

      if (response.ok) {
        console.log(`Carro com a placa ${carPlate} foi respawnado com sucesso.`);
      } else {
        console.error(`Erro ao respawnar o carro com a placa ${carPlate}.`);
      }
    } catch (error) {
      console.error("Erro ao fazer a requisição:", error);
    }
  };
  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = cars.slice(indexOfFirstCar, indexOfLastCar);

  const totalPages = Math.ceil(cars.length / carsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="nui-wrapper">
      <div className="popup-thing">
        <div>
          <h1>Popup da NUI!</h1>
          <p>Saia com a tecla de escape</p>
          <button onClick={handleToggleNui}>Alternar NUI</button>
          {isVisible && (
            <div>
              <h2>Carros Disponíveis</h2>
              <div className="car-list">
                {currentCars.map((car) => (
                  <div key={car.id} className="car-item">
                    <img src={car.imageUrl} alt={`${car.model}`} className="car-image" />
                    <div className="car-info">
                      <h3>{car.name}</h3>
                      <p>Modelo: {car.model}</p>
                      <p>Cor: {car.color}</p>
                      <p>Placa: {car.plate}</p>
                      <button onClick={() => handleSelectCar(car.plate)}>Selecionar</button>

                    </div>
                  </div>
                ))}
              </div>
              <div className="pagination">
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => handlePageChange(index + 1)}
                    className={currentPage === index + 1 ? 'active' : ''}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;