const handleSucces = (res, data, status = 200) => {
  res.json({
    body: data,
    error: "",
  });
};
const handleError = (res, error, status = 500, errorDev = "") => {
  console.error("[Error]:", errorDev);
  res.json({
    error,
    body: "",
  });
};

handleMessageDelete = (administrator, eliminated) => {
  console.log(
    "The administrator is ",
    {
      name: administrator.name,
      email: administrator.email,
      role: administrator.role,
    },
    " and eliminated to ",
    {
      collection: eliminated.collection.name,
      name: eliminated.name,
      id: eliminated.id,
    }
  );
};

module.exports = { handleError, handleSucces, handleMessageDelete };
