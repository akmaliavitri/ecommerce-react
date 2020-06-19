module.exports = (res, ok, message, data) => {
  res.json({
    ok,
    message,
    data,
  });
};
