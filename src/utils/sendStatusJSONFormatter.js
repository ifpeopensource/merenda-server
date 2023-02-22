import statuses from 'statuses';

function formattedSendStatus(statusCode) {
  return this.contentType('application/json')
    .status(statusCode)
    .send({ error: { message: statuses.message[statusCode] } });
}

export { formattedSendStatus };
