const express = require('express')
const cors = require('cors');
const app = express()
require('dotenv').config();

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 3000;

// console.log(process.env.DB_USER);
// console.log(process.env.DB_PASS);

app.use(cors())
app.use(express.json())






const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ova35yv.mongodb.net/?appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();


    const db = client.db('model_db')
    const modelCollection = db.collection('models')
    const purchasedCollection = db.collection('purchased')

    // all models 
    app.get('/models', async(req,res)=>{
      const result =await modelCollection.find().toArray()
      res.send(result)
    })

    app.get('/latest-models', async(req, res) =>{

      const result = await modelCollection.find().sort({createdAt: -1}).limit(6).toArray()
      res.send(result)

    })

    app.get('/models/:id',async (req, res) =>{
      const id = req.params.id
      const result = await modelCollection.findOne({_id :new ObjectId(id)})
      res.send(result)
    })

    app.post('/models', async (req, res) =>{

      const newModel = req.body;
      const result =await modelCollection.insertOne(newModel)
      res.send(result)

    })

    app.delete('/models/:id', async(req, res)=>{
      const id = req.params.id;
      const result = await modelCollection.deleteOne({_id: new ObjectId(id)})
      res.send(result)
    })

    app.put('/models/:id', async(req, res) =>{
      const id = req.params.id;
      const TheModel = req.body
      const query = {_id : new ObjectId(id)}
      const updatedModel = {
        $set :TheModel
      }
      const result = await modelCollection.updateOne(query, updatedModel)
      res.send(result)

    })

    app.get('/models-of', async(req, res) =>{
      const email = req.query.email;
      console.log(email);
      const result =await modelCollection.find({createdBy:email}).toArray()
      res.send(result)

    })

    app.post('/purchased-models/:id', async (req, res) =>{
      const model = req.body;
      const id =req.params.id
      const result =await purchasedCollection.insertOne(model)
      res.send(result)


        //downloads counted 
      const query = {_id: new ObjectId(id)}
      const update = {
        $inc: {
          purchased: 1
        }
      }
      const purchaseCounted = await modelCollection.updateOne(query, update)
      res.send({result, purchaseCounted})


    })

      app.get('/purchased-models', async(req, res) =>{
      const email = req.query.email;
      console.log(email);
      const result =await purchasedCollection.find({purchasedBy:email}).toArray()
      res.send(result)

    })

     app.get('/purchased-models/:id',async (req, res) =>{
      const id = req.params.id
      const result = await purchasedCollection.findOne({_id :new ObjectId(id)})
      res.send(result)
    })

      app.get("/search", async(req, res) => {
      const search_text = req.query.search
      const result = await modelCollection.find({name: {$regex: search_text, $options: "i"}}).toArray()
      res.send(result)
    })


   



    

    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);













app.listen(port, () => {
  console.log(`The server is running on port ${port}`)
})
