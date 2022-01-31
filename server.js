require('dotenv').config()
const express = require('express')
const { Client } = require('@notionhq/client')
const chunk = require('lodash.chunk')
const upperfirst = require('lodash.upperfirst')

const app = express()
const port = process.env.EXPRESS_PORT
var cors = require('cors')

app.use(cors())

app.get('/', async (req, res) => {
  const notion = new Client({ auth: process.env.NOTION_TOKEN })
  const rawGuests = await notion.databases.query({
    database_id: process.env.NOTION_PROJECT
  })

  res.send(
    chunk(
      rawGuests.results.map(({ properties }, idx) => ({
        id: idx + 1,
        name: properties.Name.title[0].plain_text
          .split(' ')
          .map(part => upperfirst(part))
          .join(' '),
        relation: upperfirst(properties.relation.rich_text[0].plain_text),
        sprite: properties.sprite.rich_text[0].plain_text.split(','),
        description: properties.description.rich_text[0].plain_text
      })),
      6
    )
  )
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
