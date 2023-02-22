import statuses from 'statuses';

function formattedSendStatus(statusCode) {
  // this === app.response
  return this.contentType('application/json')
    .status(statusCode)
    .send({ error: { message: statuses.message[statusCode] } });
}

export { formattedSendStatus };
