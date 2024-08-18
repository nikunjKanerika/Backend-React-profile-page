import { app } from "./app.js";
import { Connection } from "./db/Connection.js";

const PORT = 8001;

//Connection database
Connection();

app.listen(PORT,()=>{
    console.log(`Server connected on port ${PORT}`)
})