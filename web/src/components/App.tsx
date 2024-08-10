import React, { useEffect, useState } from "react";
import "./App.css";

// Simulação de dados de carros
const simulatedCars = Array.from({ length: 50 }, (_, index) => ({
  id: index + 1,
  name: `Carro ${index + 1}`,
  model: `Modelo ${index + 1}`,
  color: `Cor ${index + 1}`,
  plate: `PLT-${index + 1}`,
  imageUrl: `https://via.placeholder.com/200?text=Carro+${index + 1}`, // Imagem simulada
}));

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

  useEffect(() => {
    if (isVisible) {
      // Simula a resposta da API
      setCars(simulatedCars);
    }
  }, [isVisible]);

  const handleToggleNui = () => {
    setIsVisible(!isVisible);
  };

  const handleSelectCar = (carId: number) => {
    console.log(`Carro selecionado: ${carId}`);
    // Adicione lógica para o que deve acontecer quando um carro é selecionado
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
                      <button onClick={() => handleSelectCar(car.id)}>Selecionar</button>
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
