const models = require('../models');
const Promise = require('bluebird');

const parseCookies = (req, res, next) => {
<<<<<<< HEAD
  // req.get looks up any key/value in the req header
  let cookieString = req.get('Cookie') || '';

  // the cookies could be a long string with many cookies separated by '; '
  let parsedCookies = cookieString.split('; ').reduce(
    (cookies, cookie) => {
      if (cookie.length) { // foo=bar
        let index = cookie.indexOf('=');
        let key = cookie.slice(0, index);
        let token = cookie.slice(index + 1);
        cookies[key] = token;
      }
      return cookies;
    }, {}
  );
  // now we have an array of cookie objects for the rest of the app to use
  req.cookies = parsedCookies;
  next();
};
=======

  let cookieString = req.get('Cookie') || '';

  parsedCookies = cookieString.split('; ').reduce((cookies, cookie) => {
    if (cookie.length) {
      let index = cookie.indexOf('=');
      let key = cookie.slice(0, index);
      let token = cookie.slice(index + 1);
      cookies[key] = token;
    }
    return cookies;
  }, {});

  req.cookies = parsedCookies;

  next();
  };
>>>>>>> f9779f866e8800cdfaeab200e4039f3f7f96ac56

module.exports.parseCookies = parseCookies;