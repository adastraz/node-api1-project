// implement your API here
const express = require('express')

const Users = require ('./data/db.js')
const server = express()

server.use(express.json())
server.use(cors())

server.get('/api/users', (req, res) => {
    Users.find()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({errorMessage: 'The users information could not be retrieved.'})
        })
})

server.get('/api/users/:id', (req, res) => {
    Users.findById(req.params.id)
        .then(user => {
            if (user === undefined){
                res.status(404).json('The user with the specified ID does not exist.')
            }else{
                res.status(200).json(user)
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ errorMessage: 'The user information could not be retrieved.'})
        })
})

server.delete('/api/users/:id', (req, res) => {
    Users.remove(req.params.id)
        .then(removed => {
            if (removed === undefined){
                res.status(404).json('The user with the specified ID does not exist.')
            }else{
                res.status(200).json(removed)
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ errorMessage: 'The user could not be removed'})
        })
})

server.post('/api/users', (req, res) => {
    const usersInfo = req.body
    if(!req.body.name || !req.body.bio){
        res.status(400).json({ errorMessage: 'Please provide name and bio for the user.'})
    }else{
    Users.insert(usersInfo)
        .then(user => {
            res.status(201).json(user)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({errorMessage: 'There was an error while saving the user to the database'})
        })
}})

server.put('/api/users/:id', (req, res) => {
    Users.update(req.params.id, req.body) 
        .then(user => {
            if (user === undefined){
                res.status(404).json('The user with the specified ID does not exist.')
            }else if(!req.body.name || !req.body.bio){
                res.status(400).json({ errorMessage: 'Please provide name and bio for the user.'})
            }else{
                res.status(200).json(user) 
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({errorMessage: 'The user information could not be modified.'})
        })
})

const port = 5000
server.listen(port, () => console.log(`API is listening on port ${port}`))
