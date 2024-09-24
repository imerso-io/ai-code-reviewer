# ![a code reviewer by AI (2)](https://github.com/imerso-io/octopulls-reviewer-poc/assets/125743142/85fbc14f-60f9-4c04-8615-bcf376df3fef)

# 🐙 Octopulls, this POC shows how AI acts as a reviewer.

## Comandos
Comando | Descrição
--- | ---
`npm install` | Instala todas as dependências
`npm run review` | Gera revisão do seu código por IA integrado com GitHub

## Variáveis de Ambiente
Variável | Descrição | Obrigatório
--- | --- | ---
[OPENAI_API_KEY](https://platform.openai.com/api-keys) | Chave de API da OpenAI (ChatGPT) | Sim
[GITHUB_AUTH_TOKEN](https://github.com/settings/tokens) | Token de acesso do GitHub para aplicações | Não
GITHUB_ORGANIZATION | Nome da organização ou usuário que vai ter acesso ao repositório para revisão | Sim
GITHUB_REPOSITORY | Nome do repositório que vai ter os PRs revisados | Sim
GITHUB_PULL_NUMBER | Número do Pull Request que terá os commits obtidos para revisão | Sim
