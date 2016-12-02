const express = require('express');
const debug = require('debug')('gallery');
const walk = require('walk');
const mime = require('mime');
const serveStatic = require('serve-static');
const app = express();

const IMAGE_FOLDER = process.env.IMAGE_FOLDER || '/Users/arcturus/dev/android/MediaSync/server/uploads';

app.use(express.static('dist'));

app.get('/api/v1/allphotos', (req, res) => {
  debug('Sending all photos');
  if (IMAGE_FOLDER == null) {
    return res.json(images);
  }

  getImages().
    then((imgs) => {
      return res.json(imgs);
    });

});

app.use('/gallery', serveStatic(IMAGE_FOLDER, {
  filter: (path) => {
    const mimeType = mime.lookup(path);
    return mimeType.indexOf('image') != -1;
  }
}));

app.use('/', serveStatic('./dist'));

function getImages() {
  return new Promise((resolve, reject) => {
    let options = {
      followLinks: false
    };

    var files = [];

    debug('Walking directory ', IMAGE_FOLDER);
    walker = walk.walk(IMAGE_FOLDER, options);
    walker.on("directories", (root, dirStatsArray, next) => { next(); });
    walker.on("file", (root, fileStats, next) => {
      debug('On file ', root, fileStats);
      const relativePath = root.replace(IMAGE_FOLDER, '');
      debug('Relative path ', relativePath);
      const mimeType = mime.lookup(fileStats.name);
      if (mimeType.indexOf('image') == -1) {
        return next();
      }
      files.push({
        original: `gallery/${relativePath}/${fileStats.name}`,
        thumbnail: `gallery/${relativePath}/${fileStats.name}`
      });
      next();
    });
    walker.on("errors", reject);
    walker.on("end", () => {
      resolve(files);
    });
  });
}

module.exports = app;

// Dummy content
const images = [
  {
    original: 'http://www.material-ui.com/images/grid-list/00-52-29-429_640.jpg',
    thumbnail: 'http://www.material-ui.com/images/grid-list/00-52-29-429_640.jpg',
  },
  {
    original: 'http://www.material-ui.com/images/grid-list/burger-827309_640.jpg',
    thumbnail: 'http://www.material-ui.com/images/grid-list/burger-827309_640.jpg',
  },
  {
    original: 'http://www.material-ui.com/images/grid-list/camera-813814_640.jpg',
    thumbnail: 'http://www.material-ui.com/images/grid-list/camera-813814_640.jpg',
  },
  {
    original: 'http://www.material-ui.com/images/grid-list/morning-819362_640.jpg',
    thumbnail: 'http://www.material-ui.com/images/grid-list/morning-819362_640.jpg',
  },
  {
    original: 'http://www.material-ui.com/images/grid-list/hats-829509_640.jpg',
    thumbnail: 'http://www.material-ui.com/images/grid-list/hats-829509_640.jpg',
  },
  {
    original: 'http://www.material-ui.com/images/grid-list/honey-823614_640.jpg',
    thumbnail: 'http://www.material-ui.com/images/grid-list/honey-823614_640.jpg',
  },
  {
    original: 'http://www.material-ui.com/images/grid-list/vegetables-790022_640.jpg',
    thumbnail: 'http://www.material-ui.com/images/grid-list/vegetables-790022_640.jpg',
  },
  {
    original: 'http://www.material-ui.com/images/grid-list/water-plant-821293_640.jpg',
    thumbnail: 'http://www.material-ui.com/images/grid-list/water-plant-821293_640.jpg',
  },
];
