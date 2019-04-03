const config = {
  port: process.env.PORT || 3001,
  dbUrl: process.env.NODE_ENV === 'test'
    ? 'mongodb://localhost/costsApiTest'
    : 'mongodb://localhost/costsApi',
  getAppUrl() {
    return `http://localhost:${this.port}`
  }
}

export default config;
