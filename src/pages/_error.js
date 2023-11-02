function Error({ statusCode }) {
  return (
    <p>
      {statusCode === 401
        ? `Unauthorized User!`
        : statusCode === 403
        ? "Forbidden"
        : "An error occurred on client"}
    </p>
  );
}

export default Error;
