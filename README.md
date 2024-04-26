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
[OPENAI_KEY](https://platform.openai.com/api-keys) | Chave de API da OpenAI (ChatGPT) | Sim
[GITHUB_TOKEN](https://github.com/settings/tokens) | Token de acesso do GitHub para aplicações | Não
GITHUB_USER | Nome da organização ou usuário que vai ter acesso ao repositório para revisão | Sim
GITHUB_REPO | Nome do repositório que vai ter os PRs revisados | Sim
GITHUB_PULL_NUMBER | Número do Pull Request que terá os commits obtidos para revisão | Sim

## Funções
Função | Nome | Descrição
--- | --- | ---
getCommit() | Obtém Commits | Após passar as variáveis de ambiente, obtém todos os commits de um Pull Request e envia para a próxima função
commitIterator() | Itera Commits | Itera todos os commits obtidos para colocar em uma única string antes de enviá-la para o revisor de código
generateReview() | Gera Revisão | Gera revisão por Inteligência Artificial baseado no método few-shot com o código obtido e chama a função de comentar
postComment() | Posta Comentário | Após receber a revisão da IA, psota um comentário no Pull Request
