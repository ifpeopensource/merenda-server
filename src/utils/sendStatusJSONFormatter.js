import statuses from 'statuses';

function setSendStatusFormat(app) {
  app.response.sendStatus = function (statusCode) {
    return this.contentType('application/json')
      .status(statusCode)
      .send({ error: { message: statuses.message[statusCode] } });
  };
}

export { setSendStatusFormat };
