var express = require('express');
const scrapper  = require('youtube-scrapper');
var router = express.Router();
const { createWriteStream } = require("fs")
const db = require('../db');
const query = require('../utils/query')

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', async function (req, res, next) {
  var url = req.body.url;
  console.log(req.body);
  if (url == undefined || url == "" || url == null) {
    return res.json({ 'status': false, 'message': 'Url tidak boleh kosong' });
  }
  try {
    const video = await scrapper.getVideoInfo(url);
    const videoDetail = video.details
    var cek = await query.get('SELECT count(video_id) as ttl from items WHERE video_id="' + videoDetail.id + '" LIMIT 1');
    var jlh = cek[0] != undefined ? cek[0].ttl : 1;
    console.log(cek[0].ttl)
    if (jlh < 1) {
      var down = await scrapper.downloadFromVideo(video).pipe(createWriteStream("./public/video/" + videoDetail.id + ".ogg"));
      var sql = `INSERT INTO items (video_id, title, description, keywords, duration, url, author) VALUES (?, ?, ?, ?, ?, ?, ?)`;
      db.query(sql, [videoDetail.id, videoDetail.title, videoDetail.shortDescription, videoDetail.keywords.join(','), videoDetail.duration, videoDetail.url, videoDetail.author], function (err, result) {
        if (err) {
          return res.json({ 'status': false, 'message': 'Gagal menyimpan file', error: err });
        } else {
          return res.json({ 'status': true, 'message': 'Berhasil menambahkan file' });
        }
      });
    } else {
      return res.json({ 'status': false, 'message': 'URL Video telah di download'});
    }
  } catch (error) {
   return res.json({ 'status': false, 'message': error.toString()});
  }
  
  
});

module.exports = router;
