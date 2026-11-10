// API HTTP simples em Node.js (sem dependências externas)
const http = require('http');
const fs = require('fs');
const os = require('os');
const path = require('path');

const PORTA = process.env.APP_PORT || 3000;
const PASTA_LOGS = '/app/logs';
const ARQUIVO_LOG = path.join(PASTA_LOGS, 'registro_acessos.log');

let totalRequisicoes = 0;
const tempoInicio = Date.now();

fs.mkdirSync(PASTA_LOGS, { recursive: true });

// Grava no console (docker compose logs) e no volume (registro_acessos.log)
function registrarAcesso(mensagem) {
  const linha = `[${new Date().toISOString()}] LOG: ${mensagem}`;
  console.log(linha);
  fs.appendFileSync(ARQUIVO_LOG, linha + '\n');
}

const servidor = http.createServer((req, res) => {
  totalRequisicoes++;
  registrarAcesso(`${req.method} ${req.url}`);

  // Libera o site (porta 8080) para consultar esta API (porta 8081)
  res.setHeader('Access-Control-Allow-Origin', '*');

  // NOVA ROTA: Endpoint personalizado
  if (req.url === '/api/info') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      estado: 'operacional',
      projeto: 'TP Final - Docker',
      desenvolvedores: 'Lorenzo Norberto & Ahmad Malat',
      maquina_container: os.hostname(),
      tempo_ativo_segundos: Math.floor((Date.now() - tempoInicio) / 1000),
      total_chamadas: totalRequisicoes,
      data_hora: new Date().toISOString()
    }));
    return;
  }

  // NOVA TELA INICIAL DA API: Visual mais moderno
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(`<!DOCTYPE html>
<html lang="pt-BR"><head><meta charset="UTF-8"><title>API Backend - TP Final</title></head>
<body style="font-family: Arial, sans-serif; padding: 40px; background-color: #f8f9fa; color: #333;">
  <div style="max-width: 600px; margin: 0 auto; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
      <h1 style="color: #0284c7; margin-top: 0;">Meu Backend Node.js</h1>
      <p>Servidor rodando no container: <strong>${os.hostname()}</strong></p>
      <p>Porta interna: ${PORTA} | Porta externa: 8081</p>
      <hr style="border: 1px solid #eee; margin: 20px 0;">
      <p>Endpoint de dados: <a href="/api/info" style="color: #0284c7; text-decoration: none; font-weight: bold;">/api/info</a></p>
      <p>Total de requisições recebidas: <span style="background: #0284c7; color: white; padding: 2px 8px; border-radius: 12px; font-size: 0.9em;">${totalRequisicoes}</span></p>
  </div>
</body></html>`);
    return;
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ erro: 'O caminho solicitado não existe nesta API' }));
});

servidor.listen(PORTA, () => registrarAcesso(`Servidor Backend ativo e escutando na porta ${PORTA}`));