module.exports = {
  port: process.env.PORT || 3000,
  dir: {
    layouts: 'views/layouts',
    partials: 'views/partials',
    public: 'public',
    views: 'views',
  },
  api: {
    hostname: 'http://localhost:8000'
  }
};
