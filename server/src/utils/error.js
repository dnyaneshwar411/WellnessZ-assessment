export class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

export function handleError(error, res) {
  console.log("worjkingfine")
  return res.status(error.statusCode || 500).json({ success: false, message: error.message })
}