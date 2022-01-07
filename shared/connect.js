const {MongoClient} = require("mongodb");


module.exports =  {
db:{},
async connect(){
try{
    const client = await MongoClient.connect('mongodb+srv://Vinoth:4FeMtEMMBJFF6CyU@cluster0.g1rip.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
  
    this.db = client.db("todolist");
    console.log(this.db)
}catch(err){
    console.log(err)
}
}
}