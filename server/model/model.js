
const mongoose=require('mongoose')


let todoSchema=new mongoose.Schema({
    task:String,
    done:{
        type:Boolean,
        default:false
    }
})

let model=new mongoose.model('todos',todoSchema)


module.exports=model