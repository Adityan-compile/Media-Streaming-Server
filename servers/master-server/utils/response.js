class Response {
  status = null;
  message = "";
  body = null;
  date = null;

  constructor(status, message="", body={}) {
    this.status = status;
    this.message = message;
    this.date = new Date();
    Object.assign(this, body);
  }
}

class ResponseBuilder {
  setStatus(status) {
    this.status = status;
    return this;
  }
  setMessage(message="Success") {
    this.message = message;
    return this;
  }
  setBody(body={}) {
    this.body = body;
    return this;
  }
  build() {
    return new Response(this.status, this.message, this.body);
  }
}

module.exports = ResponseBuilder;
