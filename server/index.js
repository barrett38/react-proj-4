const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 4004;

app.use(express.json());
app.use(cors());

app.listen(PORT, () => console.log(`Running on Port ${PORT}`));
