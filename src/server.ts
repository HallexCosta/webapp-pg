import http from 'node:http'
import { Pool } from 'pg'

const PORT = 3333
const PG_URL = `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
console.log('postgre_url', PG_URL)

const pool = new Pool({
  connectionString: PG_URL
})

const server = http.createServer(requestHandler)

async function requestHandler(
  request: http.IncomingMessage,
  response: http.ServerResponse
) {
  console.log('Calling endpoint', request.url)

  try {
    // define endpoint GET "/"
    if (
      request.method === 'GET'
      && request.url.includes('/')
    ) {
      response.end("I'm alive")
    }

    // define endpoint POST "/pg"
    if (
      request.method === 'POST'
      && request.url.includes('/pg')
    )  {
      for await (const body of request) {
        const { query } = JSON.parse(body)

        const client = await pool.connect()

        const result = await client.query(query)
        client.release()

        const data = {
          query: query,
          data: result.rows
        }
      
        console.log(data)
        response.writeHead(200)
        response.end(JSON.stringify(data))
      }
    }
  } catch(e) {
    response.writeHead(400)
    response.end(e)
  }
}
server
  .listen(
    3333,
    () => console.log(`Listening server on port ${PORT}`)
  )

process.on('uncaughtException', error => {
  console.error(error.name, error.message)
  console.log(error.stack)
})
process.on('SIGTERM', () => {
  console.log('server ending', new Date().toISOString())
  server.close(() => process.exit(1))
})

