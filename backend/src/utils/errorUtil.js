const handleErrorResponse = (res, statusCode, message, error = null) => {
  if (statusCode >= 500) {
    // Log full details internally (safe)
    if (error) console.error(error);

    // Send only generic message to the client
    return res.status(statusCode).json({ message: 'Internal server error' });
  }

  // For 4xx errors (bad request, not found), return a safe but useful message
  return res.status(statusCode).json({ message });
};

module.exports = { handleErrorResponse };
