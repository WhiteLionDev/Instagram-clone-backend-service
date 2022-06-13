import {
  IResponses,
  ok,
  badRequest,
  unauthorized,
  notFound,
  internalServerError
} from "../utils/apiResponse";

class Controller {
  apiResponse: IResponses;

  constructor() {
    this.apiResponse = {
      ok,
      badRequest,
      unauthorized,
      notFound,
      internalServerError
    };
  }
}

export { Controller };
