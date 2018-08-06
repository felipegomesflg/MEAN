var Usuario = require('../models/usuario.model');

_this = this

exports.get = async function(query, page, limit) {

    var options = {
        page,
        limit
    }

    try {
        var usuarios = await Usuario.paginate(query, options)
        return usuarios;
    } catch (e) {
        throw Error('Não foi possível carregar Usuários');
    }
}

exports.create = async function(data) {
    console.log(data);
    var novoUsuario = new Usuario({
        nome: data.nome,
        email: data.email,
        senha: data.senha,
        ativo: data.ativo
    })
    try {
        var usuario = await novoUsuario.save()
        return usuario;
    } catch (e) {
        if (!data.nome)
            data.nome = '';
        throw Error('Não foi possível criar o Usuário: ' + data.nome);
    }
}

exports.update = async function(data) {

    var id = data.id
    try {
        var antigoUsuario = await Usuario.findById(id);
    } catch (e) {
        if (!data.nome)
            data.nome = '';
        throw Error('Não foi possível editar o Usuário: ' + data.nome);
    }

    if (!antigoUsuario) {
        return false;
    }


    antigoUsuario.nome = data.nome
    antigoUsuario.email = data.email
    antigoUsuario.senha = data.senha
    antigoUsuario.ativo = data.ativo



    try {
        var salvarUsuario = await antigoUsuario.save()
        return salvarUsuario;
    } catch (e) {
        if (!data.nome)
            data.nome = '';
        throw Error('Não foi possível editar o Usuário: ' + data.nome);
    }
}

exports.delete = async function(id) {
    try {
        var deleted = await Usuario.remove({ _id: id })
        if (deleted.result.n === 0) {
            throw Error('Não foi possível apagar o Usuário');
        }
        return deleted
    } catch (e) {
        throw Error('Não foi possível apagar o Usuário');
    }
}