import {Router} from "express";
import {database} from "../database";

const publicHealthCheckController = Router();

publicHealthCheckController.get("/", async (request, response) => {
    const health = await database.selectFrom("health")
        .selectAll()
        .executeTakeFirst();

    if (health.test === "works")
        response.sendStatus(200);
    else
        response.sendStatus(500);
});

export {publicHealthCheckController};