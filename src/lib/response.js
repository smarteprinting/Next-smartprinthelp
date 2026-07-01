export const successResponse = (data, message = 'Success', statusCode = 200) => {
  return new Response(
    JSON.stringify({
      success: true,
      message,
      data,
    }),
    {
      status: statusCode,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
};

export const errorResponse = (message = 'Error', statusCode = 400, data = null) => {
  return new Response(
    JSON.stringify({
      success: false,
      message,
      ...(data && { data }),
    }),
    {
      status: statusCode,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
};

export const validationError = (message = 'Validation Error', errors = {}) => {
  return new Response(
    JSON.stringify({
      success: false,
      message,
      errors,
    }),
    {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
};
