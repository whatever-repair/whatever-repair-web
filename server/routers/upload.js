import fs from 'fs';
import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const router = express.Router();
app.use(bodyParser.json());

router.route('/:id')
  .get((req, res) => {
    console.log('dirname::: ',__dirname);
    return new Promise(function(resolve, reject) {
      fs.readFile(__dirname + '/../../uploads/' + req.params.id, (err, data) => {
        if (err) { return reject(err); }
        return resolve(data);
      });
    })
    .then((data) => {
      res.send(data);
    })
    .catch(err => {
      console.log('image upload failed!!! ', err);
      res.sendStatus(400);
    })
    

    // app.use('/', express.static(__dirname + '/../../db/images'));
  });

module.exports = router;
