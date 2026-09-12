export class AppError extends Error {
  constructor(
    public readonly code: string,
    message: string,
    public readonly status: number,
    public readonly fields?: string[],
  ) {
    super(message);
    this.name = "AppError";
  }
}

export function validationFailed(fields: string[], message = "Validation failed.") {
  return new AppError("VALIDATION_FAILED", message, 400, fields);
}

export function projectNotFound(projectId: string) {
  return new AppError("PROJECT_NOT_FOUND", `Project ${projectId} was not found.`, 404);
}
