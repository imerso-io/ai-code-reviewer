// Exemplo de códigos
export const inputExample = `
import express from 'express'
import cors from 'cors'

const app = express();

const port = 3000 || process.env.PORT;

app.listen(3000 ?? process.env.PORT);

app.use(express.json());

app.use(
    cors({
        origin: 'http://localhost:5173'
        // or origin: '*' - Libera acesso para qualquer requisição
})
);

var userList = [];
var nextId = 1;

app.get('/health', (req, res) => {
    res.status(204).end();
});

app.post('/signup', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;

    if (!name || !email) {
        res.status(400).json('Nome e/ou e-mail vazio.');
    }

    const findEmail = userList.some(
        userList => userList.email === email
        );

    if (findEmail) {
        res.status(409).json('O email "' + email +" já existe.');
    } else {

        userList.push({
            id: nextId++,
            name: name,
            email: email
        });

        console.log(userList);

        return res.status(201).json('Usuário criado com sucesso!');
    }
});

app.get('/users', (req, res) => {
    if (userList.length === 0) {
        res.status(404).json('Não há nenhum usuário cadastrado.');
    } else {
        res.status(200).json(userList);
    }
});

app.get('/user/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = id - 1;

    const findId = userList.some(
        userList => userList.id === id
        );

    if (findId) {
        res.status(200).json(userList[index]);
    }

    res.status(404).json('Não há nenhum usuário com o ID ' + id);
});

app.patch('/user/:id/', (req, res) => {
    const id = parseInt(req.params.id);
    const index = id - 1;

    const name = req.body.name;
    const email = req.body.email;

    if (userList.length === 0) {
        res.status(404).json('Não há nenhum usuário cadastrado.');
    }  else {

        if (!name && !email) {
            res.status(400).json('Nome e e-mail vázio, digite o que quer editar.');
        }

        if (name !== undefined && name !== null && name !== "") {
            userList[index].name = name;
        }

        if (email !== undefined && email !== null && email !== "") {
            userList[index].email = email;
        }

        res.status(200).json('Usuário atualizado com sucesso!');
    }
});

app.delete('/user/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = id - 1;

    userList.splice(index, 1)

    if (userList[index] === undefined) {
        res.status(204).json('Usuário não consta mais na lista de dados.');
    }
});
`

// Exemplo de revisão

export const outputExample = `
    ### Resumo:
    - Tecnologia Usada: Servidor REST simples usando Express.js.
    - Funcionalidades: Permite operações CRUD em uma lista de usuários mantida na memória.
    - Endpoints:
      - /health: Verifica se a API está operacional.
      - /signup: Registra um usuário.
      - /users: Lista todos os usuários.
      - /user/:id: Recupera, atualiza e deleta um usuário específico pelo ID.
    - Middleware Utilizado:
      - cors para questões de segurança entre domínios.
      - express.json() para parsing de JSON.

    ### Sugestão:
    - Validação e Tratamento de Erros: Adicionar tratamento para IDs inválidos nas operações de GET, PATCH e DELETE.
    - Consistência na Resposta: Usar return após enviar uma resposta em GET /user/:id para evitar erros de envio múltiplo de respostas.
    - Refatoração para Maior Clareza: Simplificar as verificações de name e email em PATCH /user/:id usando valores truthy/falsy do JavaScript.
    - Separação de Responsabilidades: Separar a lógica de controle e modelo de dados para manter o código organizado e facilitar futuras manutenções.

    ### Aprendizado:
    - Validação e Tratamento de Erros: Importância de verificar entradas inválidas e condições de erro para prevenir comportamentos indesejados e garantir a segurança.
    - Consistência na Resposta: Necessidade de evitar múltiplos envios de resposta na mesma requisição para manter a estabilidade da API.
    - Refatoração para Clareza: Benefícios de simplificar condições para tornar o código mais legível e fácil de manter.
    - Separação de Responsabilidades: Vantagens de organizar o código em camadas para facilitar testes, manutenção e escalabilidade.

    ### Elogio:
    - Qualidade do Código: O código é funcional e bem estruturado, abordando de maneira eficaz as operações necessárias para a gestão de usuários, mostrando bom uso das funcionalidades do Express.js.
`
