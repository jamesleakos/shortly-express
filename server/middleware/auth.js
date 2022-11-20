const models = require('../models');
const Promise = require('bluebird');

module.exports.createSession = (req, res, next) => {
  // turning a synchonous value into a promise - not 100% sure why right now
  Promise.resolve(req.cookies.shortlyid)
    .then (hash => {
      // No session - perhaps first visit
      if (!hash) {
        // this will kick down to the catch
        throw Error('No cookie found');
      }
      return model.Sessions.get({hash});
    })
    // if there was a hash, but it wasn't in our db
    .then(session => {
      if (!session) {
        // in the case of either error, we just kick down to the catch
        throw Error('No session found');
      }
    })
    // if there wasn't an id, we can get one in time for the .then - no repeated code! this is a nice pattern I haven't caught
    .catch(err => {
      return models.Sessions.create()
        .then(results => {
          return models.Sessions.get({id: results.insertId});
        })
        .then (session => {
          res.cookie('shortlyid', session.hash);
          return session;
        });
    })
    // finally we have the session info on the request, returned from the db
    .then(session => {
      req.session = session;
      next();
    });

};

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/

module.exports.verifySession = (req, res, next) => {
  // if the user is not logged in, don't let them do whatever the route handler was doing
  // send them to the login page
  models.Sessions.isLoggedIn(req.session)
    .then(ans => {
      if (ans) {
        console.log(ans);
        next();
      } else {
        console.log(ans);
        res.redirect('/login');
      }
    })
    .catch(err => {
      console.log(err);
    });
  // if (!models.Sessions.isLoggedIn(req.session)) {
  //   res.redirect('/login');
  // // otherwise, we can continue on letting them know what they were doing
  // } else {
  //   next();
  // }
};