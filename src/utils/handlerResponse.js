const handleSucces = (res, data, status = 200) => {
  res.json({
    error: "",
    body: data,
  });
};
const handleError = (res, error, status = 500, errorDev = "") => {
  console.error('[Error]:', errorDev);
  res.json({
    error,
    body: "",
  });
};

module.exports = { handleError, handleSucces };
