import { body, query } from "express-validator";

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
        .notEmpty()
        .withMessage("offset is required")
        .isInt({ min: 0, max: 100 })
        .withMessage("offset must be a number between 0 and 100"),
    ];
  }
}

export default new TodoValidator();
