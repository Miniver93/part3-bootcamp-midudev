const express=require('express') //Importamos el modulo express

const app=express(); //Creamos el servidor

app.use(express.json())


let persons=[
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

app.delete('/api/persons/:id', (request,response)=>{
    const id=Number(request.params.id)
    persons=persons.filter(pid=> pid.id !== id) //Sobreescribeme todos los elementos de mis phonebook, excepto el que no quiero
    response.status(204).end()
})

app.post('/api/persons', (request,response)=>{
    const person=request.body
    const personNames=persons.map(person=>person.name)
    
    if (!person || !person.name || !person.number) {
        return response.status(400).json({
            error: "No name or phone"
        })
    }

    const ids=persons.map(person=>person.id)
    const maxIds=Math.max(...ids)

    const newPhone={
        id: maxIds + 1,
        name: person.name,
        number: person.number
    }

    


    if(personNames.includes(person.name)){
        return response.status(400).json({
            error: "The name already exist in the phonebook"
        })
    }else{
        response.status(201).json(newPhone)
        persons=[...persons, newPhone]
    }
    
})


const PORT=3001
app.listen(PORT,()=>{
    console.log("Server running on port 3001");
})