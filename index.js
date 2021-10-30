const express = require("express");
const cors = require("cors");
const upload = require("express-fileupload");
const { Deta } = require("deta");
const SendResponse = require("./SendResponse");
const app = express();
app.use(cors());
app.use(upload());
const deta = Deta("c0w9jlc0_JyPtxR2Ye6STidP5g9yW8pRJdzwqJtmz");
const profile = deta.Drive("profile");
const cover = deta.Drive("cover");
const port = process.env.PORT || 3001;

// Profile image upload
app.post("/upload/profile", async (req, res) => {
  try {
    const name = req.files.file.name;
    const contents = req.files.file.data;
    const img = await profile.put(name, { data: contents });
    res.send({
      status: true,
      message: "Image Upload Success",
      viewUrl: `https://imageuploadtest01.herokuapp.com/profile/${img}`,
      downloadUrl: `https://imageuploadtest01.herokuapp.com/download/profile/${img}`,
    });
  } catch (error) {
    res.status(500).send(SendResponse(false, "Image Upload Not Success"));
  }
});

// Profile image view
app.get("/profile/:name", async (req, res) => {
  try {
    const name = req.params.name;
    const img = await profile.get(name);
    const buffer = await img.arrayBuffer();
    res.send(
      `<img width="100%" src='data:image/png;base64, ${Buffer.from(
        buffer
      ).toString("base64")}' />`
    );
  } catch (error) {
    res.status(404).send(SendResponse(false, "Image Not found"));
  }
});

// Profile image download
app.get("/download/profile/:name", async (req, res) => {
  try {
    const name = req.params.name;
    const img = await profile.get(name);
    const buffer = await img.arrayBuffer();
    res.send(Buffer.from(buffer));
  } catch (error) {
    res.status(404).send(SendResponse(false, "Image Not found"));
  }
});

// cover image upload
app.post("/upload/cover", async (req, res) => {
  try {
    const name = req.files.file.name;
    const contents = req.files.file.data;
    const img = await cover.put(name, { data: contents });
    res.send({
      status: true,
      message: "Image Upload Success",
      viewUrl: `https://imageuploadtest01.herokuapp.com/cover/${img}`,
      downloadUrl: `https://imageuploadtest01.herokuapp.com/download/cover/${img}`,
    });
  } catch (error) {
    res.status(500).send(SendResponse(false, "Image Upload Not Success"));
  }
});

// cover image view
app.get("/cover/:name", async (req, res) => {
  try {
    const name = req.params.name;
    const img = await cover.get(name);
    const buffer = await img.arrayBuffer();
    res.send(
      `<img width="100%" src='data:image/png;base64, ${Buffer.from(
        buffer
      ).toString("base64")}' />`
    );
  } catch (error) {
    res.status(404).send(SendResponse(false, "Image Not found"));
  }
});

// cover image download
app.get("/download/cover/:name", async (req, res) => {
  try {
    const name = req.params.name;
    const img = await cover.get(name);
    const buffer = await img.arrayBuffer();
    res.send(Buffer.from(buffer));
  } catch (error) {
    res.status(404).send(SendResponse(false, "Image Not found"));
  }
});

app.use((err, req, res, next) => {
  if (err) {
    console.log(err);
    res
      .status(500)
      .send(SendResponse(false, "Find an error please try again!"));
  }
});

app.listen(port, () => console.log("Server runing is port", port));
