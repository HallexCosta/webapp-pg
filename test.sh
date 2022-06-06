#!/bin/bash
echo "Bash version ${BASH_VERSION}..."
for i in {0..50}
  do
    curl -X POST http://localhost:3333/pg \
          -d '{"query": "select * from animes"}' \
          -H "Content-Type: application/json" \
          -H "token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJob3N0IjoiZHJvbmEuZGIuZWxlcGhhbnRzcWwuY29tIiwibmFtZSI6Im5hYW56am1sIiwidXNlciI6Im5hYW56am1sIiwicGFzc3dvcmQiOiIwRGE5cTFCd3BoRGcwaGpWNXZmRWNxVGVXVHpsVl9ISSIsInBvcnQiOjU0MzIsImlhdCI6MTY1NDAyMzQ4Nywic3ViIjoibmFhbnpqbWwifQ.5Hz2Ajr5ahJZHfmrsLCca-dXjxpBZCDRMqWA-VKEw8c"
 done
