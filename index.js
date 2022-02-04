const server = require("./src/app.js");
const { conn } = require("./src/database/config");

const PORT = process.env.PORT || 3000;

// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
