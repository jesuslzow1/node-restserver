const mongoose =  require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol valido'
}

let Schema  = mongoose.Schema;

let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'nombre es requerido']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'el email es equerido']
    },
    password: {
        type: String,
        required: [true, 'el password es obligatorio']
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});


//este bloque de codigo es para evitar que el campo contraseña se devuelva como resp
usuarioSchema.methods.toJSON = function () {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject;
}

usuarioSchema.plugin(uniqueValidator, {message: '{PATH} debe de ser unico'})
module.exports = mongoose.model('Usuario', usuarioSchema);