const express = require("express");
const app = express();
const initRoutes = require("./routes/web");
const PORT = process.env.PORT || 4000

app.use(express.urlencoded({ extended: true }));
initRoutes(app);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});