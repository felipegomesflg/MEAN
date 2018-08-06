var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var UsuarioSchema = new mongoose.Schema({
    nome: String,
    email: String,
    senha: String,
    ativo: Boolean
})

UsuarioSchema.plugin(mongoosePaginate)
const Usuario = mongoose.model('Usuario', UsuarioSchema)

module.exports = Usuario;