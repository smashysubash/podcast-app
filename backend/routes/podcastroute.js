const Model = require('../model/podcast')


const addpodcast = async (req,res)=>{
    try {
        const data = new Model({
            name: req.body.name,
            description: req.body.description,
            category: req.body.category,
            type: req.body.type,
            speaker: req.body.speaker,
            image: req.files['image'][0].path,
            content:req.files['content'][0].path,
            viewcount: req.body.viewcount
        })   
        try {
            const dataToSave = await data.save();
            res.status(200).json({ "success":true, "error":null, "id":dataToSave._id})
        }
        catch (error) {
            res.status(400).json({ "success":false, "error": error.message})
        }    
    } catch (err) {
        console.log(err);
    }
}

const podcastbyid = async (req,res)=>{
    const id = req.body.id;
    try{
        const data = await Model.findById(id)
        Model.findByIdAndUpdate(id,{viewcount: data.viewcount+1})
        res.status(200).json(data)
    }catch{
        res.status(400).json({ "success":false, "error": error.message})
    }
}

const podcastsearchbyname = async (req,res)=>{
    const name = '/'+req.body.name+'/';
    try{
        const data = await Model.find({name: name},'name category type speaker image')
        res.status(200).json(data)
    }catch{
        res.status(400).json({ "success":false, "error": error.message})
    }
}

const popularpodcast = async (req,res)=>{
    try{
        const data = await Model.find({},'name category type speaker image').sort({ viewcount: -1 }).limit(20)
        res.status(200).json(data)
    }catch{
        res.status(400).json({ "success":false, "error": error.message})
    }
}

module.exports = {
    addpodcast,
    podcastbyid,
    podcastsearchbyname,
    popularpodcast,

}