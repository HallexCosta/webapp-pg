 curl -X POST http://localhost:3333/db-login \
      -d '{"name": "naanzjml", "host": "drona.db.elephantsql.com", "user": "naanzjml", "password": "0Da9q1BwphDg0hjV5vfEcqTeWTzlV_HI", "port": 5432}'

echo "\n\nSecond request"
curl -X POST http://localhost:3333/pg \
      -d '{"query": "select * from animes"}' \
      -H "Content-Type:: application/json" \
      -H "token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJob3N0IjoiZHJvbmEuZGIuZWxlcGhhbnRzcWwuY29tIiwibmFtZSI6Im5hYW56am1sIiwidXNlciI6Im5hYW56am1sIiwicGFzc3dvcmQiOiIwRGE5cTFCd3BoRGcwaGpWNXZmRWNxVGVXVHpsVl9ISSIsInBvcnQiOjU0MzIsImlhdCI6MTY1NDAyMzQ4Nywic3ViIjoibmFhbnpqbWwifQ.5Hz2Ajr5ahJZHfmrsLCca-dXjxpBZCDRMqWA-VKEw8c"
