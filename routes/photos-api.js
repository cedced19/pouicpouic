var express = require('express');
var router = express.Router();
var auth = require('../policies/auth.js');
var pngjs = require("pngjs");

var converter = function (cam) {
  var rgb = cam.toRGB();
  var png = new pngjs.PNG({
      width: cam.width, height: cam.height,
      deflateLevel: 1, deflateStrategy: 1,
  });
  var size = cam.width * cam.height;
  for (var i = 0; i < size; i++) {
      png.data[i * 4 + 0] = rgb[i * 3 + 0];
      png.data[i * 4 + 1] = rgb[i * 3 + 1];
      png.data[i * 4 + 2] = rgb[i * 3 + 2];
      png.data[i * 4 + 3] = 255;
  }
  return png;
};


/* GET Photo */
router.get('/', auth, function(req, res, next) {
  res.writeHead(200, {
      "content-type": "image/png",
      "cache-control": "no-cache",
  });
  converter(req.app.cam).pack().pipe(res);
});

module.exports = router;
