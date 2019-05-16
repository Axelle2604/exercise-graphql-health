const express = require('express');
const schema = require('./services/schema.js');
const graphqlHTTP = require('express-graphql');
const app = express();

// app.all('*', (req, res, next) => {
//   //console.log('coucou');
// });

app.use('/graphql', graphqlHTTP({ schema, graphiql: true }));

const server = app.listen(8080, () =>
  console.log(`Server started on http://localhost:${server.address().port}.`)
);
