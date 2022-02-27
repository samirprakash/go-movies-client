const Alert = ({ type, msg }) => {
  return (
    <div className={`alert ${type}`} role="alert">
      {msg}
    </div>
  );
};

export default Alert;
