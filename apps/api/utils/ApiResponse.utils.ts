class ApiResponse<T = null> {
  public readonly statusCode: number;
  public readonly success: boolean;
  public readonly message: string;
  public readonly data: T | null;
  public readonly meta?: Record<string, unknown>;

  constructor(
    statusCode: number,
    data: T | null = null,
    message: string = "Success",
    meta?: Record<string, unknown>
  ) {
    this.statusCode = statusCode;
    this.success = statusCode < 400;
    this.message = message;
    this.data = data;
    this.meta = meta;
  }
}

export default ApiResponse;