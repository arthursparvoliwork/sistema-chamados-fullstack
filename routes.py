from flask import request, jsonify
from models import db, Chamado

def registrar_rotas(app):

    @app.route('/chamados', methods=['POST'])
    def criar_chamado():
        dados = request.json
        chamado = Chamado(
            titulo=dados['titulo'],
            descricao=dados['descricao']
        )
        db.session.add(chamado)
        db.session.commit()
        return jsonify({"mensagem": "Chamado criado"})

    @app.route('/chamados', methods=['GET'])
    def listar_chamados():
        chamados = Chamado.query.all()
        return jsonify([
            {
                "id": c.id,
                "titulo": c.titulo,
                "descricao": c.descricao,
                "status": c.status
            } for c in chamados
        ])

    @app.route('/chamados/<int:id>', methods=['PUT'])
    def atualizar_chamado(id):
        chamado = Chamado.query.get(id)
        chamado.status = request.json['status']
        db.session.commit()
        return jsonify({"mensagem": "Atualizado"})

    @app.route('/chamados/<int:id>', methods=['DELETE'])
    def deletar_chamado(id):
        chamado = Chamado.query.get(id)
        db.session.delete(chamado)
        db.session.commit()
        return jsonify({"mensagem": "Deletado"})