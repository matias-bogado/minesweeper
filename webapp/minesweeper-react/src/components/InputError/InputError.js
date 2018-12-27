import React from "react";
import './InputError.scss';

const InputError = ({ error }: { error: string }) => {
  return error ? <div className="input-error">{error}</div> : null;
};

export default InputError;
