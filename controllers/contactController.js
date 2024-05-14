const fs = require("fs");
const path = require("path");
const contactBookPath = path.join(__dirname, "contactBook.json");

let contactBook = [];

const saveContactBook = (data) => {
  fs.writeFileSync(contactBookPath, JSON.stringify(data, null, 4), "utf8");
};

const getAllNumbers = (req, res) => {
  res.json(contactBook);
};

const getNumberById = (req, res) => {
  const numberId = parseInt(req.params.id);
  const number = contactBook.find((n) => n.id === numberId);
  if (number) {
    res.json(number);
  } else {
    res.status(404).json({ error: "Number not found" });
  }
};

const createNumber = (req, res) => {
  const newNumber = req.body;
  newNumber.id = contactBook.length
    ? contactBook[contactBook.length - 1].id + 1
    : 1;
  contactBook.push(newNumber);
  saveContactBook(newNumber);
  res.status(201).json(newNumber);
};

const updateNumber = (req, res) => {
  const numberId = parseInt(req.params.id);
  const numberIndex = contactBook.findIndex((n) => n.id === numberId);

  if (numberIndex !== -1) {
    contactBook[numberIndex] = {
      ...contactBook[numberIndex],
      ...req.body,
      id: numberId,
    };
    saveContactBook();
    res.json(contactBook[numberIndex]);
  } else {
    res.status(404).json({ error: "Number not found" });
  }
};

const deleteNumber = (req, res) => {
  const numberId = parseInt(req.params.id);
  const numberIndex = contactBook.findIndex((n) => n.id === numberId);

  if (numberIndex !== -1) {
    const deletedNumber = contactBook.splice(numberIndex, 1)[0];
    saveContactBook();
    res.json(deletedNumber);
  } else {
    res.status(404).json({ error: "Number not found" });
  }
};

module.exports = {
  getAllNumbers,
  getNumberById,
  createNumber,
  updateNumber,
  deleteNumber,
};
