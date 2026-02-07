from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)
CORS(app)

# --- CONFIGURAÇÃO DO BANCO ---
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# --- MODELO ---
class Chamado(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    titulo = db.Column(db.String(100), nullable=False)
    descricao = db.Column(db.String(300), nullable=False)
    status = db.Column(db.String(50), default="Aberto")
    data_criacao = db.Column(db.DateTime, default=datetime.utcnow)

# --- CRIAR BANCO AUTOMATICAMENTE ---
with app.app_context():
    db.create_all()

# --- ROTAS ---

@app.route('/chamados', methods=['POST'])
def criar_chamado():
    dados = request.get_json()

    if not dados or 'titulo' not in dados or 'descricao' not in dados:
        return jsonify({
            "success": False,
            "message": "Título e descrição são obrigatórios"
        }), 400

    novo_chamado = Chamado(
        titulo=dados['titulo'],
        descricao=dados['descricao']
    )

    db.session.add(novo_chamado)
    db.session.commit()

    return jsonify({
        "success": True,
        "message": "Chamado criado com sucesso",
        "data": {
            "id": novo_chamado.id,
            "status": novo_chamado.status
        }
    }), 201


@app.route('/chamados', methods=['GET'])
def listar_chamados():
    chamados = Chamado.query.all()

    return jsonify({
        "success": True,
        "data": [
            {
                "id": c.id,
                "titulo": c.titulo,
                "descricao": c.descricao,
                "status": c.status,
                "data_criacao": c.data_criacao.isoformat()
            } for c in chamados
        ]
    })


@app.route('/chamados/<int:id>', methods=['PUT'])
def atualizar_chamado(id):
    chamado = db.session.get(Chamado, id)

    if not chamado:
        return jsonify({
            "success": False,
            "message": "Chamado não encontrado"
        }), 404

    dados = request.get_json()
    chamado.status = dados.get('status', chamado.status)

    db.session.commit()

    return jsonify({
        "success": True,
        "message": "Chamado atualizado"
    })


@app.route('/chamados/<int:id>', methods=['DELETE'])
def deletar_chamado(id):
    chamado = db.session.get(Chamado, id)

    if not chamado:
        return jsonify({
            "success": False,
            "message": "Chamado não encontrado"
        }), 404

    db.session.delete(chamado)
    db.session.commit()

    return jsonify({
        "success": True,
        "message": "Chamado deletado"
    })


# --- INICIALIZAÇÃO ---
if __name__ == '__main__':
    app.run(debug=True)
