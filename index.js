const express=require('express') //Importamos el modulo express

const app=express(); //Creamos el servidor

app.use(express.json())


const persons=[
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request,response)=>{
    response.send(persons)
})

app.get('/info', (request,response)=>{
    const entries=persons.length
    const date=new Date()
    response.send(`<p>Phonebook has info for ${entries} people</p><br>${date}`)
})

app.get('/api/persons/:id', (request, response)=>{
    const id=Number(request.params.id)
    console.log("id:",id);

    const person=persons.find(pid=> pid.id === id)


    if(person){
        response.json(person).end()
    }{
        response.status(404).end()
    }

    
})


const PORT=3001
app.listen(PORT,()=>{
    console.log("Server running on port 3001");
})