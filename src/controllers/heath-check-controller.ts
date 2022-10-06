import {Router} from "express";
import {database} from "../database";

const publicHealthCheckController = Router();

publicHealthCheckController.get("/", async (request, response) => {
    let health = await database.selectFrom("health")
        .selectAll()
        .executeTakeFirst();

    if (health.test !== "works")
        response.sendStatus(500);
});

export {publicHealthCheckController};