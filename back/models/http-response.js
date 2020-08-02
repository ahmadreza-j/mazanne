class HttpResponse {
  constructor(result, code, message) {
    this.result = result;
    this.code = code;
    this.message = message;
  }
}

module.exports = HttpResponse;
