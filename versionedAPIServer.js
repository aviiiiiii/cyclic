
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

dotenv.config();

const PORT = process.env.PORT || 5051;

app.get("/", (req, res) => {
    res.send("Working");
});

///////////////////////////////////////////////////////////////////////////
//      V1

app.get("/v1/getPost", (req, res) => {
    res.json({ version: "v1", data: "This is the Original Version of getPost" });
});

app.get("/v1/getData", (req, res) => {
    res.json({ version: "v1", data: "This is the Original Version of getData" });
});

app.get("/v1/getInfo", (req, res) => {
    res.json({ version: "v1", data: "This is the Original Version of getInfo" });
});

app.get("/v1/getDetails", (req, res) => {
    res.json({ version: "v1", data: "This is the Original Version of getDetails" });
});


///////////////////////////////////////////////////////////////////////////
//      V2

app.get("/v2/getPost", (req, res) => {
    res.json({ version: "v2", data: "This is the Original Version of getPost" });
});

app.get("/v2/getData", (req, res) => {
    res.json({ version: "v2", data: "This is the Original Version of getData" });
});

app.get("/v2/getInfo", (req, res) => {
    res.json({ version: "v2", data: "This is the Original Version of getInfo" });
});

app.get("/v2/getDetails", (req, res) => {
    res.json({ version: "v2", data: "This is the Updated V2 Version of getDetails" });
});

///////////////////////////////////////////////////////////////////////////
//      V3

app.get("/v3/getPost", (req, res) => {
    res.json({ version: "v3", data: "This is the Original Version of getPost" });
});

app.get("/v3/getData", (req, res) => {
    res.json({ version: "v3", data: "This is the Original Version of getData" });
});

app.get("/v3/getInfo", (req, res) => {
    res.json({ version: "v3", data: "This is the Updated V3 Version of getInfo" });
});

app.get("/v3/getDetails", (req, res) => {
    res.json({ version: "v3", data: "This is the Updated V2 Version of getDetails" });
});


///////////////////////////////////////////////////////////////////////////
//      V4

app.get("/v4/getPost", (req, res) => {
    res.json({ version: "v4", data: "This is the Updated V4 Version of getPost" });
});

app.get("/v4/getData", (req, res) => {
    res.json({ version: "v4", data: "This is the Updated V4 Version of getData" });
});

app.get("/v4/getInfo", (req, res) => {
    res.json({ version: "v4", data: "This is the Updated V3 Version of getInfo" });
});

app.get("/v4/getDetails", (req, res) => {
    res.json({ version: "v4", data: "This is the Updated V2 Version of getDetails" });
});


///////////////////////////////////////////////////////////////////////////
//      POST V1


app.post("/v1/postInfo", (req, res) => {
    const { data } = req.body;
    res.json({
        version: "v1",
        data: `This is the Original Version and data : ${data}`
    });
});

app.post("/v1/postData", (req, res) => {
    const { data } = req.body;
    res.json({
        version: "v1",
        data: `This is the Original Version and data : ${data}`
    });
});

///////////////////////////////////////////////////////////////////////////
//      POST V2


app.post("/v2/postInfo", (req, res) => {
    const { data } = req.body;
    res.json({
        version: "v2",
        data: `This is the Original Version and data : ${data}`
    });
});

app.post("/v2/postData", (req, res) => {
    const { data } = req.body;
    res.json({
        version: "v2",
        data: `This is the Updated V2 Version and data : ${data}`
    });
});

///////////////////////////////////////////////////////////////////////////
//      POST V3


app.post("/v3/postInfo", (req, res) => {
    const { data } = req.body;
    res.json({
        version: "v3",
        data: `This is the Original Version and data : ${data}`
    });
});

app.post("/v3/postData", (req, res) => {
    const { data } = req.body;
    res.json({
        version: "v3",
        data: `This is the Updated V3 Version and data : ${data}`
    });
});


///////////////////////////////////////////////////////////////////////////
//      POST V4


app.post("/v4/postInfo", (req, res) => {
    const { data } = req.body;
    res.json({
        version: "v4",
        data: `This is the Updated V4 Version and data : ${data}`
    });
});

app.post("/v4/postData", (req, res) => {
    const { data } = req.body;
    res.json({
        version: "v4",
        data: `This is the Updated V4 Version and data : ${data}`
    });
});



app.listen(PORT, () => {
    console.log("Server started ");
});
