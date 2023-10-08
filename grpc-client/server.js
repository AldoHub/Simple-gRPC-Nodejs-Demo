const express = require("express");
const app = express();
const cors = require("cors");

const PORT = 3000 || env.PORT;

app.use(express.json());
app.use(cors());

app.use("/case", require("./routes/cases"));

app.listen(PORT, () => {
    console.log(`Server on port ${3000}`);
});
