var UsuarioService = require('../services/usuario.service')

_this = this

exports.get = async function(req, res, next) {
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;

    try {
        var usuarios = await UsuarioService.get({}, page, limit)
        return res.status(200).json({ status: 200, data: usuarios, message: "OK" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });

    }
}

exports.create = async function(req, res, next) {
    var usuario = {
        nome: req.body.nome,
        email: req.body.email,
        senha: req.body.senha,
        ativo: req.body.ativo
    };
    try {
        var created = await UsuarioService.create(usuario)
        return res.status(201).json({ status: 201, data: created, message: "OK" })
    } catch (e) {
        return res.status(400).json({ status: 400, message: "Erro ao Criar Usuário" })
    }
}

exports.update = async function(req, res, next) {

    if (!req.body._id) {
        return res.status(400).json({ status: 400., message: "Id must be present" })
    }

    var id = req.body._id;

    var usuario = {
        id,
        nome: req.body.nome ? req.body.nome : null,
        email: req.body.email ? req.body.email : null,
        senha: req.body.senha ? req.body.senha : null,
        ativo: req.body.ativo != null ? req.body.ativo : true
    };
    try {
        var updated = await UsuarioService.update(usuario)
        return res.status(200).json({ status: 200, data: updated, message: "OK" })
    } catch (e) {
        return res.status(400).json({ status: 400., message: e.message })
    }
}

exports.remove = async function(req, res, next) {

    var id = req.params.id;

    try {
        var deleted = await UsuarioService.delete(id)
        return res.status(204).json({ status: 204, message: "OK" })
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message })
    }

}