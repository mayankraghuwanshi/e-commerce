const asyncHandler = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((error) => {
        console.error('Async error:', error);
        next(error);
    });
}

export default asyncHandler
  