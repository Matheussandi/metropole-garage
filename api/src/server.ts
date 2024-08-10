import fastify from 'fastify';

const app = fastify({ logger: true });

app.get('/', async (request, reply) => {
  return { hello: 'world' };
});

app.listen({ port: 3333 }).then(() => {
  console.log('Server started on http://localhost:3333');
});