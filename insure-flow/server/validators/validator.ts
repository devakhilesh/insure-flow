

// complete validation file

export interface ValidationResult {
  status: boolean;
  message: string;
}

//=====================================
// pass()
// validation successful ho to ye return karo
//=====================================

export const pass = (
  message = "Validation passed"
): ValidationResult => ({
  status: true,
  message,
});

//=====================================
// fail()
// validation fail ho to proper error message return karo
//=====================================

export const fail = (
  message: string
): ValidationResult => ({
  status: false,
  message,
});

//=====================================
// isEmpty()
// check karta hai value missing ya blank hai ya nahi
// use: required field validation
//=====================================

export const isEmpty = (
  value: unknown
): boolean => {

  if (
    value === undefined ||
    value === null
  ) {
    return true;
  }

  if (
    typeof value === "string"
  ) {
    return (
      value.trim().length === 0
    );
  }

  if (Array.isArray(value)) {
    return value.length === 0;
  }

  return false;
};

//=====================================
// isString()
// check karta hai value string hai ya nahi
// use: name, city, state, email
//=====================================

export const isString = (
  value: unknown
): value is string => {

  return (
    typeof value === "string"
  );
};

//=====================================
// isNumber()
// check karta hai value valid number hai ya nahi
// use: salary, amount, premium
//=====================================

export const isNumber = (
  value: unknown
): value is number => {

  return (
    typeof value === "number" &&
    !Number.isNaN(value)
  );
};

//=====================================
// isInteger()
// check karta hai whole number hai ya nahi
// use: id, quantity, count
//=====================================

export const isInteger = (
  value: unknown
): boolean => {

  return Number.isInteger(value);
};

//=====================================
// isBoolean()
// check karta hai true/false type hai ya nahi
// use: isActive, verified
//=====================================

export const isBoolean = (
  value: unknown
): value is boolean => {

  return (
    typeof value === "boolean"
  );
};

//=====================================
// isArray()
// check karta hai array hai ya nahi
// use: documents[], roles[]
//=====================================

export const isArray = (
  value: unknown
): value is unknown[] => {

  return Array.isArray(value);
};

//=====================================
// isObject()
// check karta hai plain object hai ya nahi
// use: payload, address object
//=====================================

export const isObject = (
  value: unknown
): value is Record<
  string,
  unknown
> => {

  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value)
  );
};

//=====================================
// isDateValue()
// check karta hai date valid hai ya nahi
// use: dob, policyDate
//=====================================

export const isDateValue = (
  value: unknown
): boolean => {

  if (!isString(value)) {
    return false;
  }

  const date =
    new Date(value);

  return !Number.isNaN(
    date.getTime()
  );
};

//=====================================
// isValidEnum()
// check karta hai value allowed list me hai ya nahi
// use: gender, role, status
//=====================================

export const isValidEnum = (
  value: unknown,
  allowedValues: readonly string[]
): boolean => {

  return (
    isString(value) &&
    allowedValues.includes(value)
  );
};

//=====================================
// isValidRegex()
// regex pattern match karta hai
// use: email, phone, zip
//=====================================

export const isValidRegex = (
  value: unknown,
  regex: RegExp
): boolean => {

  return (
    isString(value) &&
    regex.test(value)
  );
};

//=====================================
// isValidLength()
// string length min/max ke andar hai ya nahi
// use: name, address, city
//=====================================

export const isValidLength = (
  value: unknown,
  min: number,
  max: number
): boolean => {

  if (!isString(value)) {
    return false;
  }

  const length =
    value.trim().length;

  return (
    length >= min &&
    length <= max
  );
};

//=====================================
// isValidNumberRange()
// number given range ke andar hai ya nahi
// use: age, premium, salary
//=====================================

export const isValidNumberRange = (
  value: unknown,
  min: number,
  max: number
): boolean => {

  if (!isNumber(value)) {
    return false;
  }

  return (
    value >= min &&
    value <= max
  );
};

//=====================================
// requiredString()
// required string field validate karta hai
// use: fullName, city, country
//=====================================

export const requiredString = (
  value: unknown,
  fieldName: string,
  min = 1,
  max = 255
): ValidationResult => {

  if (isEmpty(value)) {
    return fail(
      `${fieldName} is required`
    );
  }

  if (!isString(value)) {
    return fail(
      `${fieldName} must be a string`
    );
  }

  if (
    !isValidLength(
      value,
      min,
      max
    )
  ) {
    return fail(
      `${fieldName} must be between ${min} and ${max} characters`
    );
  }

  return pass();
};

//=====================================
// optionalString()
// optional string field validate karta hai
// blank ho to pass
//=====================================

export const optionalString = (
  value: unknown,
  fieldName: string,
  min = 1,
  max = 255
): ValidationResult => {

  if (isEmpty(value)) {
    return pass();
  }

  return requiredString(
    value,
    fieldName,
    min,
    max
  );
};

//=====================================
// requiredNumber()
// required number validate karta hai
// use: amount, salary
//=====================================

export const requiredNumber = (
  value: unknown,
  fieldName: string,
  min?: number,
  max?: number
): ValidationResult => {

  if (
    value === undefined ||
    value === null
  ) {
    return fail(
      `${fieldName} is required`
    );
  }

  if (!isNumber(value)) {
    return fail(
      `${fieldName} must be a number`
    );
  }

  if (
    min !== undefined &&
    value < min
  ) {
    return fail(
      `${fieldName} must be greater than or equal to ${min}`
    );
  }

  if (
    max !== undefined &&
    value > max
  ) {
    return fail(
      `${fieldName} must be less than or equal to ${max}`
    );
  }

  return pass();
};

//=====================================
// optionalNumber()
// optional number field validate karta hai
//=====================================

export const optionalNumber = (
  value: unknown,
  fieldName: string,
  min?: number,
  max?: number
): ValidationResult => {

  if (isEmpty(value)) {
    return pass();
  }

  return requiredNumber(
    value,
    fieldName,
    min,
    max
  );
};

//=====================================
// requiredInteger()
// integer type validate karta hai
// use: quantity, count
//=====================================

export const requiredInteger = (
  value: unknown,
  fieldName: string
): ValidationResult => {

  if (
    !isInteger(value)
  ) {
    return fail(
      `${fieldName} must be an integer`
    );
  }

  return pass();
};

//=====================================
// requiredBoolean()
// true/false field validate karta hai
//=====================================

export const requiredBoolean = (
  value: unknown,
  fieldName: string
): ValidationResult => {

  if (
    value === undefined ||
    value === null
  ) {
    return fail(
      `${fieldName} is required`
    );
  }

  if (!isBoolean(value)) {
    return fail(
      `${fieldName} must be boolean`
    );
  }

  return pass();
};

//=====================================
// optionalBoolean()
// optional boolean validate karta hai
//=====================================

export const optionalBoolean = (
  value: unknown,
  fieldName: string
): ValidationResult => {

  if (isEmpty(value)) {
    return pass();
  }

  return requiredBoolean(
    value,
    fieldName
  );
};

//=====================================
// requiredEnum()
// enum value validate karta hai
// use: role, status, gender
//=====================================

export const requiredEnum = (
  value: unknown,
  fieldName: string,
  allowedValues: readonly string[]
): ValidationResult => {

  if (isEmpty(value)) {
    return fail(
      `${fieldName} is required`
    );
  }

  if (!isString(value)) {
    return fail(
      `${fieldName} must be string`
    );
  }

  if (
    !allowedValues.includes(value)
  ) {
    return fail(
      `Invalid ${fieldName}`
    );
  }

  return pass();
};

//=====================================
// optionalEnum()
// optional enum validate karta hai
//=====================================

export const optionalEnum = (
  value: unknown,
  fieldName: string,
  allowedValues: readonly string[]
): ValidationResult => {

  if (isEmpty(value)) {
    return pass();
  }

  return requiredEnum(
    value,
    fieldName,
    allowedValues
  );
};

//=====================================
// requiredEmail()
// email format validate karta hai
// use: signup/login email
//=====================================

export const requiredEmail = (
  value: unknown,
  fieldName = "Email"
): ValidationResult => {

  if (isEmpty(value)) {
    return fail(
      `${fieldName} is required`
    );
  }

  if (!isString(value)) {
    return fail(
      `${fieldName} must be string`
    );
  }

  const regex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (
    !regex.test(value.trim())
  ) {
    return fail(
      `Invalid ${fieldName.toLowerCase()}`
    );
  }

  return pass();
};

//=====================================
// requiredPhone()
// phone validation karta hai
// use: customer phone
//=====================================

export const requiredPhone = (
  value: unknown,
  fieldName = "Phone"
): ValidationResult => {

  if (isEmpty(value)) {
    return fail(
      `${fieldName} is required`
    );
  }

  if (!isString(value)) {
    return fail(
      `${fieldName} must be string`
    );
  }

  const regex =
    /^\+?[0-9]{10,15}$/;

  if (
    !regex.test(
      value.replace(/\s/g, "")
    )
  ) {
    return fail(
      `Invalid ${fieldName.toLowerCase()}`
    );
  }

  return pass();
};

//=====================================
// requiredZipCode()
// ZIP code validate karta hai
//=====================================

export const requiredZipCode = (
  value: unknown,
  fieldName = "ZIP code"
): ValidationResult => {

  if (isEmpty(value)) {
    return fail(
      `${fieldName} is required`
    );
  }

  if (!isString(value)) {
    return fail(
      `${fieldName} must be string`
    );
  }

  const regex =
    /^\d{5}(-\d{4})?$/;

  if (
    !regex.test(value.trim())
  ) {
    return fail(
      `Invalid ${fieldName.toLowerCase()}`
    );
  }

  return pass();
};

//=====================================
// requiredDate()
// valid date validate karta hai
//=====================================

export const requiredDate = (
  value: unknown,
  fieldName: string
): ValidationResult => {

  if (isEmpty(value)) {
    return fail(
      `${fieldName} is required`
    );
  }

  if (!isString(value)) {
    return fail(
      `${fieldName} must be string`
    );
  }

  const date =
    new Date(value);

  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return fail(
      `Invalid ${fieldName.toLowerCase()}`
    );
  }

  return pass();
};

//=====================================
// requiredDOB18Plus()
// DOB valid + minimum 18 age check
//=====================================

export const requiredDOB18Plus = (
  value: unknown,
  fieldName = "Date of birth"
): ValidationResult => {

  const dateValidation =
    requiredDate(
      value,
      fieldName
    );

  if (
    !dateValidation.status
  ) {
    return dateValidation;
  }

  const birthDate =
    new Date(value as string);

  const today =
    new Date();

  let age =
    today.getFullYear() -
    birthDate.getFullYear();

  const monthDiff =
    today.getMonth() -
    birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (
      monthDiff === 0 &&
      today.getDate() <
      birthDate.getDate()
    )
  ) {
    age--;
  }

  if (age < 18) {
    return fail(
      "User must be at least 18 years old"
    );
  }

  return pass();
};

//=====================================
// requiredArray()
// array validate karta hai
// use: documents[]
//=====================================

export const requiredArray = (
  value: unknown,
  fieldName: string,
  minLength = 1
): ValidationResult => {

  if (
    value === undefined ||
    value === null
  ) {
    return fail(
      `${fieldName} is required`
    );
  }

  if (!isArray(value)) {
    return fail(
      `${fieldName} must be array`
    );
  }

  if (
    value.length <
    minLength
  ) {
    return fail(
      `${fieldName} must contain at least ${minLength} item(s)`
    );
  }

  return pass();
};

//=====================================
// requiredObject()
// object validate karta hai
// use: address object
//=====================================

export const requiredObject = (
  value: unknown,
  fieldName: string
): ValidationResult => {

  if (
    value === undefined ||
    value === null
  ) {
    return fail(
      `${fieldName} is required`
    );
  }

  if (!isObject(value)) {
    return fail(
      `${fieldName} must be object`
    );
  }

  return pass();
};

//=====================================
// validateFields()
// multiple validators ko ek saath run karta hai
// first fail aate hi return kar deta hai
//=====================================

export const validateFields = (
  validators: Array<
    () => ValidationResult
  >
): ValidationResult => {

  for (const validator of validators) {

    const result =
      validator();

    if (!result.status) {
      return result;
    }
  }

  return pass();
};