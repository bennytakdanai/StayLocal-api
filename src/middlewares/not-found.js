

module.exports = (req,res,next)=>{
    res.status(404).json({message: "resource was not found in this server"})
}