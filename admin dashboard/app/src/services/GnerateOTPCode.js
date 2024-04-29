const GenerateOTPCode = () => {
  const code = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
  return code.toString();
};

export default GenerateOTPCode;
