let errors = [];

function Validation() {
  errors = [];
}

Validation.prototype.hasMaxLen = (value, max, message) => {
  if (!value || value.length > max) errors.push({ message: message });
};

Validation.prototype.isEmail = (value, message) => {
  const reg = new RegExp(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/);
  if (!reg.test(value)) errors.push({ message: message });
};

Validation.prototype.isGreaterThan = (value, min, message) => {
  if (!value || isNaN(value) || value < min) errors.push({ message: message });
};

Validation.prototype.errors = () => {
  return errors;
};

Validation.prototype.isValid = () => {
  return errors.length === 0;
};

module.exports = Validation;
