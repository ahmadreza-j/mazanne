const getTestName = (req, res, next) => {
  const name = req.params.name;
  res.json({ message: `your name is ${name}` });
};

module.exports = {
  getTestName,
};
