import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { TodoInstance } from "../model";

class TodoController {
  async create(req: Request, res: Response) {
    const id = uuidv4();
    try {
      const record = await TodoInstance.create({ ...req.body, id });
      return res.json({ record, msg: "Record created successfully" });
    } catch (err) {
      return res.json({
        msg: "Error in creating record",
        status: 500,
        route: "/create",
      });
    }
  }

  async readPagination(req: Request, res: Response) {
    try {
      const limit = req.query?.limit as number | undefined;
      const offset = req.query?.offset as number | undefined;
      const records = await TodoInstance.findAll({
        where: {},
        limit,
        offset,
      });
      return res.json(records);
    } catch (err) {
      return res.json({
        msg: "Error in fetching records",
        status: 500,
        route: "/read",
      });
    }
  }

  async readById(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const record = await TodoInstance.findOne({ where: { id } });
      return res.json(record);
    } catch (err) {
      console.log(err);
      return res.json({
        msg: "Error in fetching records",
        status: 500,
        route: "/read/:id",
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const record = await TodoInstance.findOne({ where: { id } });

      if (!record) {
        return res.json({
          msg: "Record not found",
          status: 404,
          route: "/update/:id",
        });
      }

      const updatedRecord = await record.update({
        completed: !record.getDataValue("completed"),
      });
      return res.json({ updatedRecord, msg: "Record updated successfully" });
    } catch (err) {
      console.log(err);
      return res.json({
        msg: "Error in updating record",
        status: 500,
        route: "/update/:id",
      });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const record = await TodoInstance.findOne({ where: { id } });

      if (!record) {
        return res.json({
          msg: "Record not found",
          status: 404,
          route: "/delete/:id",
        });
      }

      const deletedRecord = await record.destroy();
      return res.json({ deletedRecord, msg: "Record deleted successfully" });
    } catch (err) {
      console.log(err);
      return res.json({
        msg: "Error in deleting record",
        status: 500,
        route: "/delete/:id",
      });
    }
  }
}

export default new TodoController();
