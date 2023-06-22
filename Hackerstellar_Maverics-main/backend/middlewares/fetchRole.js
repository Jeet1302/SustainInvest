const fetchAdminRole = (req, res, next)=>{
    if(req.user.role === "admin"){
        next();
    } else{
        res.status(401).send({ error: "You are not authorized to access this page" });
    }
}

const fetchNormalRole = (req, res, next)=>{
    if(req.user.role === "normal"){
        next();
    } else{
        res.status(401).send({ error: "You are not authorized to access this page" });
    }
}

module.exports = {
    fetchAdminRole,
    fetchNormalRole
};