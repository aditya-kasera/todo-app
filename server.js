import {app} from "./app.js";
import {connectDB} from "../node-api/data/database.js";

connectDB();

app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT} in ${process.env.NODE_ENV} mode.`);
});

