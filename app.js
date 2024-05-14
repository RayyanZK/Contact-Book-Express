const express = require("express");
const path = require("path");
const contactRoutes = require("./routes/contactRoutes");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname)));

app.use("/number", contactRoutes);

app.get("/", (req, res) => {
  res.send({ message: "Hello world!" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
