const Joi = require("joi");
const { StatusCodes } = require("http-status-codes");
const { errorResponse } = require("../utils/response");

module.exports = {
  registerAuth: async (req, res, next) => {
    const correctCondition = Joi.object({
      name: Joi.string().required().min(3).max(30).trim().strict().messages({
        "string.base": "Tên phải là chuỗi",
        "string.empty": "Tên không được để trống",
        "string.min": "Tên phải có ít nhất {#limit} ký tự",
        "string.max": "Tên không được vượt quá {#limit} ký tự",
        "any.required": "Tên không được để trống",
        "string.trim": "Tên không được chứa khoảng trắng ở đầu và cuối",
      }),
      email: Joi.string().email().required().messages({
        "string.base": "Email phải là chuỗi",
        "string.empty": "Email không được để trống",
        "string.email": "Email không đúng định dạng",
        "any.required": "Email không được để trống",
      }),
      password: Joi.string().required().min(8).trim().strict().messages({
        "string.base": "Mật khẩu phải là chuỗi",
        "string.empty": "Mật khẩu không được để trống",
        "string.min": "Mật khẩu phải chứa ít nhất 8 ký tự",
        "any.required": "Mật khẩu không được để trống",
        "string.trim": "Mật khẩu không được chứa khoảng trắng ở đầu và cuối",
      }),

      repeat_password: Joi.string()
        .required()
        .valid(Joi.ref("password"))
        .messages({
          "any.only": "Mật khẩu nhập lại không khớp",
          "any.required": "Mật khẩu nhập lại không được để trống",
        }),
    }).with("password", "repeat_password");

    try {
      const { email, name, password, repeat_password } = req.body;
      console.log("name: ", name);
      console.log("email: ", email);
      await correctCondition.validateAsync(
        { email, name, password, repeat_password },
        { abortEarly: false }
      );
      next();
    } catch (error) {
      const errorMessage = new Error(error).message;
      const customError = errorResponse(
        res,
        StatusCodes.UNPROCESSABLE_ENTITY,
        errorMessage
      );
      return customError;
    }
  },
  loginAuth: async (req, res, next) => {
    const correctCondition = Joi.object({
      email: Joi.string().email().required().messages({
        "string.empty": "Email không được để trống",
        "string.email": "Email không đúng định dạng",
        "any.required": "Email không được để trống",
      }),
      password: Joi.required().messages({
        "string.empty": "Mật khẩu không được để trống",
        "any.required": "Mật khẩu không được để trống",
      }),
    });

    try {
      await correctCondition.validateAsync(req.body, { abortEarly: true });
      next();
    } catch (error) {
      const errorMessage = new Error(error).message;
      const customError = errorResponse(
        res,
        StatusCodes.UNPROCESSABLE_ENTITY,
        errorMessage
      );
      return customError;
    }
  },
};
