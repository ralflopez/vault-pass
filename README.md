# 🔐 Vault Pass

A password manager based on the [Zero Knowledge Model](https://www.lastpass.com/security/zero-knowledge-security)

# 🌐 Preview

![Preview](https://github.com/ralflopez/vault-pass/raw/main/preview.gif)

# 🌎 Live

- Not available because of the code architecture. (MVC with nest js + next js). Free tier hosting services cannot acommodate running 2 apps (front end + backend) in one instance.
- Solution: Split frontend and backend into different services (client + API) instead of having one MVC codebase.

## 👩‍💻 Tech Stack

- Typescript
- Nest.js
- Next.js
- Chakra UI
- REST
- PostgreSQL
- Session Auth
- Prisma
- Docker
- Jest

## ❔ Pogram Flow

### Getting vault / passwords

1. Client: input email and master password
2. Client: Generate encrpytion key by hashing email and password with PBKDF2 (5k rounds)
3. Client: Generate authentication key by hashing email and password with PBKDF2 (+1 round)
4. Server: Hash authentication key with PBKD2F (100k rounds) \*
5. Server: Query passwords based on the authentication key
6. Client: Decrpyt using the encryption key (AES - 256)

### Adding a password

1. Client: input email and master password
2. Client: Generate encrpytion key by hashing email and password with PBKDF2 (5k rounds)
3. Client: Generate authentication key by hashing email and password with PBKDF2 (+1 round)
4. Server: Hash input with PBKD2F (100k rounds) \*
5. Server: Encrpyt input with AES - 256
6. Server: Store in database with hashed authentication key

## 🚀 Optimization needed

1. Use async version of the bcrpyt hasing function so that the process can run on libuvs thread pool and not block the event loop.

## 📚 References

- [LastPass Security Architecture](https://assets.cdngetgo.com/69/c0/2cef992e48eeba015c85312f16ce/lastpass-encryption.pdf)
- [How Passwords Mangers Work](https://www.youtube.com/watch?v=w68BBPDAWr8)
