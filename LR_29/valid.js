let validator = (params) => {
  if (!Array.isArray(params)) {
    throw new Error("Параметры представлены не в виде массива");
  }
  if (params.length < 2) {
    throw new Error("Необходимо два и более параметра");
  }
  params.forEach((p) => {
    if (!isFinite(p)) {
      throw new Error("В качестве параметра передано не число");
    }
  });

  return params;
};

let divValidator = (params) => {
  if (!params?.x) {
    throw new Error("Не задан параметр X");
  }
  if (params.y === 0) {
    throw new Error("Деление на ноль");
  }
  if (!params?.y) {
    throw new Error("Не задан параметр y");
  }
  if (params.length < 2) {
    throw new Error("Необходимо два и более параметра");
  }
  if (!isFinite(params.x)) {
    throw new Error("В качестве параметра X передано не число");
  }
  if (!isFinite(params.y)) {
    throw new Error("В качестве параметра Y передано не число");
  }

  return params;
};

module.exports = {
  validator,
  divValidator,
};
