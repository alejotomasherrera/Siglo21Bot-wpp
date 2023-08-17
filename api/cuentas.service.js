const axios = require("axios");
/**
 * Consultamos el ticket de soporte
 * @param {*} dni
 * @returns
 */
const getCuenta = async (dni) => {
  try {
    var config = {
      method: "get",
      url: `http://127.0.0.1:1337/api/cuentas?filters[dni][$eq]=${dni}`,
    };

    const response = await axios(config);
    console.log(response.data);
    return response.data;
  } catch (e) {
    console.log(e);
    return null;
  }
};



module.exports = { getCuenta };