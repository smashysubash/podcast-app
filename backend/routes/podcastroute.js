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
            res.status(500).json({ "success":false, "error": error.message})
        }    
    } catch (err) {
        console.log(err);
    }
}

const podcastbyid = async (req,res)=>{
    const id = req.params.id;
    try{
        const data = await Model.findById(id)
        const v = data.viewcount+1
        Model.findByIdAndUpdate({_id : id},{ $inc: { viewcount: 1 } }, { new: true }) 
        .then(updatedPost => {
          })
          .catch(err => {
            console.error('Failed to update post', err);
          });
        res.status(200).json(data)
    }catch{
        res.status(500).json({ "success":false, "error": error.message})
    }
}

const podcastsearchbyname = async (req,res)=>{
    const name = '/'+req.params.name+'/';
    try{
        const data = await Model.find({name: name},'name category type speaker image')
        res.status(200).json(data)
    }catch{
        res.status(500).json({ "success":false, "error": error.message})
    }
}

const popularpodcast = async (req,res)=>{
    try{
        const data = await Model.find({},'name category type speaker image').sort({ viewcount: -1 }).limit(20)
        res.status(200).json(data)
    }catch{
        res.status(500).json({ "success":false, "error": error.message})
    }
}

const getpodcasts = async (req,res)=>{
    try{
        const data = await Model.find({},'name category type speaker image')
        res.status(200).json(data)
    }catch{
        res.status(500).json({ "success":false, "error": error.message})
    }
}

module.exports = {
    addpodcast,
    podcastbyid,
    podcastsearchbyname,
    popularpodcast,
    getpodcasts,
}