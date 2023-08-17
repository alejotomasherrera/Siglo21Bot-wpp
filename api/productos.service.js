const axios = require("axios");
/**
 * Consultamos el ticket de soporte
 * @param {*} producto
 * @returns
 */
const getProducto = async (producto) => {
  try {
    var config = {
      method: "get",
      url: `http://127.0.0.1:1337/api/productos?filters[nombre][$contains]=${producto}`,
    };

    const response = await axios(config);
    console.log(response.data);
    return response.data;
  } catch (e) {
    console.log(e);
    return null;
  }
};



module.exports = { getProducto };