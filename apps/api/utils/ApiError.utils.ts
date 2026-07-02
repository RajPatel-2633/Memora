export class ApiError extends Error {
  public readonly statusCode: number;
  public readonly success:false;
  public readonly code?: string;
  public readonly errors: unknown[];

  constructor(
    statusCode: number,
    message: string = "Something went wrong",
    errors: unknown[] = [],
    code?: string
  ) {
    super(message);

    this.statusCode = statusCode;
    this.success = false;
    this.errors = errors;

    Object.setPrototypeOf(this, new.target.prototype);

    Error.captureStackTrace(this, this.constructor);
  }
}

export class BadRequestError extends ApiError {
  constructor(
    message: string = "Bad Request",
    errors: unknown[] = []
  ) {
    super(400, message, errors);
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message: string = "Unauthorized") {
    super(401, message);
  }
}

export class ForbiddenError extends ApiError {
  constructor(message: string = "Forbidden") {
    super(403, message);
  }
}

export class NotFoundError extends ApiError {
  constructor(message: string = "Resource Not Found") {
    super(404, message);
  }
}

export class ConflictError extends ApiError {
  constructor(message: string = "Conflict") {
    super(409, message);
  }
}

export class InternalServerError extends ApiError {
  constructor(message: string = "Internal Server Error") {
    super(500, message);
  }
}   