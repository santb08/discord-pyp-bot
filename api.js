const axios = require('axios');

const ENDPOINT_URL = process.env.ENDPOINT_URL;
const MESSAGE_TEMPLATE =  'Hoy tienen pico y placa los vehículos particulares '
  + 'con placas terminadas en ✨ **{0}**  ✨ y las motos cuyas placas comienzan en ✨ **{1}**  ✨\n '
  + '**Ojo pues papi que me lo cogen y me lo multan** 🥵 🥵 💯 💪';

module.exports.getPyp = async () => {
  const { data: response } = await axios.get(ENDPOINT_URL);
  const { bikes, cars } = response.data;
  const message = MESSAGE_TEMPLATE
    .replace('{0}', cars.join(' - '))
    .replace('{1}', bikes.join(' - '));

  return message;
};