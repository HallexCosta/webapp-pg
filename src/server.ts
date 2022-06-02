import http from 'node:http'
import { Pool } from 'pg'

import { decode, sign, verify } from 'jsonwebtoken'

type DBConfigs =  {
  name: string
  host: string
  user: string
  port: number
  password: string
}

const PORT = process.env.PORT || 3333
const PG_URL = `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
console.log('postgre_url', PG_URL)

const server = http.createServer(requestHandler)

async function requestHandler(
  request: http.IncomingMessage,
  response: http.ServerResponse
) {
  console.log('Calling endpoint', request.method, request.url)

  try {
    request.setEncoding('utf-8')

    // define endpoint POST "/pg"
    if (
      request.method === 'POST'
      && request.url.includes('/db-login')
    ) {
      for await (const body of request) {
        const { host, port, name, user, password  } = JSON.parse(body)

        const token = sign(
          {
            host,
            name,
            user,
            password,
            port
          },
          '581fe9ce8b1360e7be8b80d416ca37a3',
          {
            subject: user
          }
        )
        console.log('token', token)
        return response.end(JSON.stringify({
          token
        }))
      }
    }

    if (
      request.method === 'POST'
      && request.url.includes('/pg')
    )  {
      const token = request.headers.token as string
      if (!token) throw new Error('Token not found')

      const isValid = verify(
        token,
        '581fe9ce8b1360e7be8b80d416ca37a3'
      )

      if (!isValid) throw Error("Token is invalid")

      const { host, user, password, name, port }  = <DBConfigs>decode(
        token,
      )

      const pgURL = `postgres://${user}:${password}@${host}:${port}/${name}`
      const pool = new Pool({
        connectionString: pgURL
      })

      for await (const body of request) {
        if (!body) throw new Error('Not receive param "query" on body')

        const { query } = JSON.parse(body)

        const client = await pool.connect()
        const result = await client.query(query)
        client.release()

        const data = {
          query: query,
          data: result.rows
        }
      
        console.log(data)
        response.writeHead(200, {
          'Content-Type': 'application/json'
        })
        response.end(JSON.stringify(data))
      }
    }

    response.writeHead(400, {
      'Content-Type': 'application/json'
    })
    return response.end("Endpoint don't exists")
  } catch(e) {
    response.writeHead(400, {
      'Content-Type': 'application/json'
    })
    return response.end(JSON.stringify({
      error: e.message
    }))
  }
}
server
  .listen(
    PORT,
    () => console.log(`Listening server on port ${PORT}`)
  )

process.on('unhandledRejection', async error => {
  console.error('unhandledRejection', error)
})
process.on('uncaughtException', error => {
  console.error(error.name, error.message)
  console.log(error.stack)
})
process.on('SIGTERM', () => {
  console.log('server ending', new Date().toISOString())
  server.close(() => process.exit(1))
})

