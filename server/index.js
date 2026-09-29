const express = require('express')
const cors = require('cors')

const app = express()
const PORT = 3001

app.use(cors())
app.use(express.json())

app.get('/api/tasks', (req, res) => {
    res.json([
        {
            id: 1,
            name: 'Clean bathroom',
            frequency: 'Weekly',
            completed: false,
            estimatedTime: 20,
            instructions: [],
            supplies: [],
            supplyLocation: '',
        },
        {
            id: 2,
            name: 'Empty kitchen bins',
            frequency: 'Daily',
            completed: false,
            estimatedTime: 10,
      instructions: [
        'Remove full bin bag',
        'Replace with a new bag',
        'Take rubbish to the correct container',
      ],
      supplies: [
        'Bin bags',
      ],
      supplyLocation: 'Kitchen cupboard',
        },
    ])
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})