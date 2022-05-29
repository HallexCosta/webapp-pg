import http from 'node:http'
//import { Pool } from 'pg'

const PORT = 3333
const PG_URL = `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
console.log('postgre_url', PG_URL)

//const pool = new Pool({
//  connectionString: PG_URL
//})

const server = http.createServer(requestHandler)

function requestHandler(
  request: http.IncomingMessage,
  response: http.ServerResponse
) {
  console.log('Calling endpoint', request.url)

  try {
    //const client = await pool.connect()
    
    // define endpoint GET "/"
    //if (
    //  request.method === 'GET'
    //  && request.url.includes('/')
    //) {

    //  return response.end("I'm alive")
    //}

    // define endpoint POST "/pg"
    if (
      request.method === 'POST'
      && request.url.includes('/pg')
    )  {
      //for await (const body of request) {
        //const { query } = JSON.parse(body)

        const data = { static: true }
        //const result = await client.query(query)
        //await client.release()

        //const data = {
        //  query: query,
        //  data: result.rows
        //}
      
        console.log(data)
        response.writeHead(200, {
          'Content-Type': 'text/plain'
        })
        return response.end(JSON.stringify(data))
      //}
    }

    response.writeHead(200, {
      'Content-Type': 'text/plain'
    })
    return response.end("I'm alive")
  } catch(e) {
    response.writeHead(400, {
      'Content-Type': 'text/plain'
    })
    return response.end(JSON.stringify({
      error: e.message
    }))
  }
}
server
  .listen(
    3333,
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

