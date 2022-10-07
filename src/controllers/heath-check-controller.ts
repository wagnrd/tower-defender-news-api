import {Router} from "express";
import {database} from "../database";

const publicHealthCheckController = Router();

publicHealthCheckController.get("/", async (request, response) => {
    const health = await database.selectFrom("health")
        .selectAll()
        .executeTakeFirst();

    if (health.test === "works")
        response.sendStatus(204);
    else
        response.sendStatus(500);
});

export {publicHealthCheckController};