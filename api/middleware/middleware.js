const User = require('../users/users-model')

function logger(req, res, next) {
  console.log(
    `[${new Date().toISOString()}]
    ${req.method} to ${req.url} 
    from ${req.get('origin')}`
    )
    next()
}



async function validateUserId(req, res, next) {
  try {
 const user = await User.getById(req.params.id)
 if(!user) {
  res.status(404).json({
    message: 'no such user',
  })
 }else {
  req.user = user
  next()
 }
  }
  catch(err){
    res.status(500).json({
      message: 'problem finding user'
    })
  }

}

function validateUser(req, res, next) {
  const { name } = req.body;
  if (!name || !name.trim()) {
    return  res.status(400).json({
      message: 'missing required name field'
    });
  } else {
next();
req.name = name.trim()
  }
  
}

function validatePost(req, res, next) {
 
  const { text } = req.body;
  if (!text || !text.trim()) {
    return  res.status(400).json({
      message: 'missing required text field'
    });
  } else {
next();
req.text = text.trim()
  }
  
}

// do not forget to expose these functions to other modules

module.exports = {logger, validatePost, validateUser, validateUserId}
