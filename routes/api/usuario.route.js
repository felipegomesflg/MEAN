var express = require('express')
var router = express.Router()
var UsuarioController = require('../../controller/usuario.controller');

router.get('/', UsuarioController.get)
router.post('/', UsuarioController.create)
router.put('/', UsuarioController.update)
router.delete('/:id', UsuarioController.remove)

module.exports = router;