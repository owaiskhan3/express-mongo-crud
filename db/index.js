const mongoose = require('mongoose');

const MONGODB = process.env.MONGODB_URL.replace('<password>', process.env.MONGODB_PASSWORD);

mongoose
  .connect(MONGODB, {
    useNewUrlParser: true,
  })
  .then((con) => console.log('connected to DB'))
  .catch((err) => console.log({ err }));
