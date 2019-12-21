var express = require('express');
var router = express.Router();
const { google } = require('googleapis');

/* GET home page. */
router.get('/demo', function (req, res, next) {

  // const oauth2Client = new google.auth.OAuth2(
  //   '32250892194-hpgfm9jm2d7mjkho5cuvoolaumqgo7ji.apps.googleusercontent.com',
  //   'H2sWsjGK0WQgj5dAdAceXpNR',
  //   'http://localhost:5000'
  // );

  // const scopes = [
  //   'https://www.googleapis.com/auth/blogger',
  //   'https://www.googleapis.com/auth/calendar'
  // ];

  // const url = oauth2Client.generateAuthUrl({
  //   // 'online' (default) or 'offline' (gets refresh_token)
  //   access_type: 'offline',
  //   // If you only need one scope you can pass it as a string
  //   scope: scopes
  // });

  // console.log(url)

  res.status(200).json({ title: 'Welcome use express + react platform.' });
});
/* GET home page. */
// router.get('/demo', function (req, res, next) {
//   res.status(200).json({ title: 'Welcome use express + react platform.' });
// });


module.exports = router;
