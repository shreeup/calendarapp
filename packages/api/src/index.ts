// packages/api/src/index.ts

import cors from 'cors'
import express from 'express'


const app = express()
const port = 5000

app.use(cors({ origin: 'http://localhost:3000' }))


app.listen(port, () => console.log(`Listening on http://localhost:${port}`))