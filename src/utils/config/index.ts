const config = {
  port: process.env.PORT,
  dbUrl: process.env.DB_URL || "",
  jwtSecret: process.env.JWT_SECRET || '',
  passwordEncryptionKey: process.env.PASSWORD_ENCRYPTION_KEY || "",
  backendUrl: process.env.BACKEND_URL || "",
}

export default config