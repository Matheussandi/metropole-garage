export interface VehicleProps {
    name: string;
    plate: string;
    color: string;
  }
  
  export interface GetCarByPlateQuery {
    plate: string;
    playerId: string;
  }