const config = {
  port: process.env.PORT,
  dbUrl: process.env.DB_URL || "",
  jwtSecret: process.env.JWT_SECRET || '',
  passwordEncryptionKey: process.env.PASSWORD_ENCRYPTION_KEY || "",
  backendUrl: process.env.BACKEND_URL || "",
  smsApiKey: process.env.SMS_API_KEY || ""
}

export default config