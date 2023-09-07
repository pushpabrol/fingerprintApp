var router = require('express').Router();
const { requiresAuth } = require('express-openid-connect');

router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Auth0 Webapp sample Nodejs',
    isAuthenticated: req.oidc.isAuthenticated()
  });
});

router.get('/profile', requiresAuth(), function (req, res, next) {
  res.render('profile', {
    userProfile: JSON.stringify(req.oidc.user, null, 2),
    title: 'Profile page'
  });
});


router.get('/login', function (req, res, next) {
  const visitorId = req.query.visitorId;
  const requestId = req.query.requestId;

  res.oidc.login({
    returnTo: '/profile',
    authorizationParams: {
      redirect_uri: `${process.env.BASE_URL}/callback`,
      visitorId,
      requestId
    },
  })
});

module.exports = router;
