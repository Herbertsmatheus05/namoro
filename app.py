from flask import Flask, render_template, request, redirect, url_for, session
from datetime import datetime
import firebase_admin
from firebase_admin import credentials

app = Flask(__name__)
app.secret_key = 'sua_chave_secreta_aqui'  # Altere para uma chave segura

# Configuração do Firebase
cred = credentials.Certificate("serviceAccountKey.json")
firebase_admin.initialize_app(cred, {
    'storageBucket': 'nosso-cantinho-9b3cd.appspot.com'
})

# Dados de login (em produção, use um banco de dados)
USUARIO = 'eu'
SENHA = '1234'

# Data do início do relacionamento
DATA_INICIO = datetime(2023, 1, 1)  # Ajuste para sua data

@app.route('/', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        if request.form['usuario'] == USUARIO and request.form['senha'] == SENHA:
            session['logado'] = True
            return redirect(url_for('home'))
    return render_template('login.html')

@app.route('/home')
def home():
    if not session.get('logado'):
        return redirect(url_for('login'))
    
    # Calcular tempo do relacionamento
    agora = datetime.now()
    diferenca = agora - DATA_INICIO
    dias = diferenca.days
    segundos = diferenca.seconds
    horas = segundos // 3600
    minutos = (segundos % 3600) // 60
    segundos = segundos % 60
    
    tempo_relacionamento = {
        'dias': dias,
        'horas': horas,
        'minutos': minutos,
        'segundos': segundos
    }
    
    return render_template('home.html', tempo_relacionamento=tempo_relacionamento)

@app.route('/logout')
def logout():
    session.pop('logado', None)
    return redirect(url_for('login'))

if __name__ == '__main__':
    app.run(debug=True)