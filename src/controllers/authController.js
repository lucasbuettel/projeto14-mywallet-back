/* const userSchema = joi.object({
    name: joi.string().min(1).required(),
    email: joi.string().required(),
    password: joi.string().required(),
    checkPassword: joi.string().required()
})

export async function postSingUp(req, res){
    const {name, email, password, checkPassword} = req.body;

    const user = {
        name,
        email,
        password,
        checkPassword 
    }

    const validation = userSchema.validate(user, {abortEarly: false});

    if(validation.error){
        const errors = validation.error.details.map((detail) => detail.message);
        res.status(422).send(errors);
        return;
    }

}

export async function getLogin(req, res){
    console.log("foi2")
} */