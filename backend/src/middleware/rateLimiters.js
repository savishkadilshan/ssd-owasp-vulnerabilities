const { rateLimit, ipKeyGenerator } = require("express-rate-limit");

const ipLimiter = (opts) =>
  rateLimit({
    standardHeaders: true,
    legacyHeaders: false,
    keyGenerator: (req, res) => ipKeyGenerator(req),
    ...opts,
  });

const loginPerIpLimiter = ipLimiter({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: "Too many login attempts from this IP. Try again later.",
});

const loginPerAccountLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req, res) => {
    const account = (req.body && (req.body.email || req.body.username)) || null;
    if (account) return `acct:${String(account).toLowerCase().trim()}`;
    return `ip:${ipKeyGenerator(req)}`;
  },
  message:
    "Too many login attempts for this account. Please try again in 15 minutes.",
});

const signupLimiter = ipLimiter({
  windowMs: 60 * 1000,
  max: 5,
  message: "Too many signups from this IP. Please slow down.",
});

const oauthInitLimiter = ipLimiter({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

const oauthCallbackLimiter = ipLimiter({
  windowMs: 15 * 60 * 1000,
  max: 60,
});

module.exports = {
  loginPerIpLimiter,
  loginPerAccountLimiter,
  signupLimiter,
  oauthInitLimiter,
  oauthCallbackLimiter,
};
