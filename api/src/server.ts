import Fastify from "fastify";
import playerRoutes from "./routes/playerRoutes";
import vehicleRoutes from "./routes/vehicleRoutes";

const app = Fastify();

app.register(playerRoutes);
app.register(vehicleRoutes);

app.listen({ port: 3333 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Servidor rodando em ${address}`);
});