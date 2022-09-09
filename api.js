const axios = require('axios');

const ENDPOINT_URL = process.env.ENDPOINT_URL;
const MESSAGE_TEMPLATE =  'Hoy tienen pico y placa los vehículos particulares '
  + 'con placas terminadas en ✨ **{0}**  ✨ y las motos cuyas placas comienzan en ✨ **{1}**  ✨\n '
  + '**Ojo pues papi que me lo cogen y me lo multan** 🥵 🥵 💯 💪';

module.exports.getPyp = async (city = 'medellin') => {
  const { data: response } = await axios.get(`${ENDPOINT_URL}/${city}`);
  const { bikes, cars } = response.data;

  const bikesMessage = bikes?.length
    ? bikes.join(' - ')
    : 'NO APLICA:)'

  const message = MESSAGE_TEMPLATE
    .replace('{0}', cars.join(' - '))
    .replace('{1}', bikesMessage);

  return message;
};