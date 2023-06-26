import dotenv from "dotenv";
import express from "express";
import router from "./routes/index";
import cors from "cors";

dotenv.config({ path: "./.env" });

const app = express();

//settings
app.set("port", process.env.PORT || 3000);
app.set("json spaces", 2);

//middlewares
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//routes
app.use("/api", router);
app.get("/", (_, res) => {
  return res.json({
    message: "Server on",
  });
});

//Serve
app.listen(app.get("port"), () => {
  console.log("Server on port " + app.get("port"));
});
