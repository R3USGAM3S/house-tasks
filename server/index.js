const express = require('express')
const cors = require('cors')
const db = require('./database')
const app = express()
const PORT = 3001

app.use(cors())
app.use(express.json())

app.get('/api/tasks', (req, res) => {
  db.all('SELECT * FROM tasks', (error, rows) => {
    if (error) {
      console.error('Failed to fetch tasks:', error.message)
      res.status(500).json({ error: 'Failed to fetch tasks' })
      return
    }

    const tasks = rows.map((row) => ({
      id: row.id,
      name: row.name,
      frequency: row.frequency,
      completed: Boolean(row.completed),
      estimatedTime: row.estimated_time,
      instructions: JSON.parse(row.instructions),
      supplies: JSON.parse(row.supplies),
      supplyLocation: row.supply_location,
    }))

    res.json(tasks)
  })
})
app.post('/api/tasks', (req, res) => {
  const {
    name,
    frequency,
    estimatedTime,
    instructions,
    supplies,
    supplyLocation,
  } = req.body

  const sql = `
    INSERT INTO tasks (
      name,
      frequency,
      completed,
      estimated_time,
      instructions,
      supplies,
      supply_location
    )
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `

  db.run(
    sql,
    [
      name,
      frequency,
      0,
      estimatedTime,
      JSON.stringify(instructions),
      JSON.stringify(supplies),
      supplyLocation,
    ],
    function (error) {
      if (error) {
        console.error('Failed to create task:', error.message)
        res.status(500).json({ error: 'Failed to create task' })
        return
      }

      res.status(201).json({
        id: this.lastID,
        name,
        frequency,
        completed: false,
        estimatedTime,
        instructions,
        supplies,
        supplyLocation,
      })
    }
  )
})
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})