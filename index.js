require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const {
  InteractionType,
  InteractionResponseType,
  verifyKey,
} = require('discord-interactions');

const { getPyp } = require('./api');

const PORT = process.env.PORT || 3000;
const app = express();

const HEADER_SIGNATURE = 'x-signature-ed25519';
const HEADER_TIMESTAMP = 'x-signature-timestamp';
const PUBLIC_KEY = process.env.PUBLIC_KEY;

const COMMAND_DEFAULT = 'pyp';

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());


app.post('/hooks', async (req, res) => {
  const signature = req.header(HEADER_SIGNATURE);
  const timestamp = req.header(HEADER_TIMESTAMP);
  const rawBody = JSON.stringify(req.body);
  const isValidRequest = verifyKey(rawBody, signature, timestamp, PUBLIC_KEY);

  if (!isValidRequest) {
    return res.status(401).send({
      message: 'Bad request signature',
    });
  }

  const { type, data: commandData, member, guild_id } = req.body;

  if (type === InteractionType.PING) {
    return res.status(200).send({
      type: InteractionResponseType.PONG,
    });
  }
  const { name, options } = commandData;
  const [city] = options;

  console.log(`[member] ${member.nick} [guild] ${guild_id} [city] ${city.value}`);

  if (name === COMMAND_DEFAULT) {
    const responseMessage = await getPyp(city.value);

    return res.status(200).send({
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        content: responseMessage
      }
    })
  }
  console.log(type, name);
})

app.listen(PORT);