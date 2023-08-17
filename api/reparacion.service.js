const axios = require("axios");
/**
 * Consultamos el ticket de soporte
 * @param {*} id
 * @returns
 */
const getReparacion = async (id) => {
  try {
    var config = {
      method: "get",
      url: `http://127.0.0.1:1337/api/reparacions/${id}`,
    };

    const response = await axios(config);
    console.log(response.data);
    return response.data;
  } catch (e) {
    console.log(e);
    return null;
  }
};

module.exports = { getReparacion };