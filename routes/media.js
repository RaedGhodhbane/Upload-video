const router = require("express").Router();
const auth = require("../middleware/auth");
const Media = require("../models/Media");
const multer = require("multer");

//fs  file system
const fs = require("fs");

// module pour upload files
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!fs.existsSync("public")) {
      fs.mkdirSync("public");
    }
    if (!fs.existsSync("public/videos")) {
      fs.mkdirSync("public/videos");
    }
    cb(null, "public/videos");
  },
  filename: function (req, file, cb) {
    // const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    var ext = path.extname(file.originalname);
    if (ext !== ".mkv" && ext !== ".mp4") {
      return cb(new Error("Type video must be .mp4 or .mkv"));
    }
    cb(null, true);
  },
});

// get all medias

router.get("/", auth, async (req, res) => {
  try {
    const medias = await Media.find();
    res.json(medias);
  } catch (error) {
    res.status(500).json({ msg: "Server erreur", err: error.message });
  }
});

// create media
router.post(
  "/createmedia",
  upload.fields([
    {
      name: "videos",
      maxCount: 5,
    },
  ]),
  async (req, res) => {
    const { name, description } = req.body;
    let videosPath = [];

    if (req.files.videos.length > 0) {
      for (let video of req.files.videos) {
        videosPath.push("/" + video.path);
      }
    }
    console.log(videosPath);

    try {
      const createMedia = await Media.create({
        name,
        description,
        videos: videosPath,
      });

      res.json({
        msg: "media created successfully",
        createMedia,
      });
    } catch (error) {
      res.status(500).json({ msg: "Server erreur", err: error.message });
    }
  }
);

module.exports = router;
