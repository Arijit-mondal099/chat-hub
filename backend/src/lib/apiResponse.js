// coustome api resopnse massage blue print
export class ApiResponse {
  constructor(status, message = "success", data = {}) {
    this.status = status;
    this.message = message;
    this.success = status < 400;
    this.data = data;
  }
}
