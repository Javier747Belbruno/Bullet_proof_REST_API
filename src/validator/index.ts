import { body, param, query } from "express-validator";

class TodoValidator {
  checkCreateTodo() {
    return [
      body("id").optional().isUUID(4).withMessage("id must be a valid uuid"),
      body("title").notEmpty().withMessage("Title is required"),
      body("completed")
        .optional()
        .isBoolean()
        .withMessage("Completed must be a boolean")
        .isIn([0, false])
        .withMessage("The value of completed must be 0 or false"),
    ];
  }
  checkReadTodo() {
    return [
      query("limit")
        .notEmpty()
        .withMessage("limit is required")
        .isInt({ min: 1, max: 10 })
        .withMessage("limit must be a number between 1 and 10"),
      query("offset")
        .optional()
        .isNumeric()
        .withMessage("offset must be a number"),
    ];
  }
  checkIdParam() {
    return [
      param("id")
        .notEmpty()
        .withMessage("id is required")
        .isUUID(4)
        .withMessage("id must be a valid uuid"),
    ];
  }
}

export default new TodoValidator();
