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
    - Validação e Tratamento de Erros para IDs Inválidos
    Aqui, Request e Response são importados do pacote express para usar tipagem explícita nos parâmetros req e res, garantindo que as propriedades e métodos usados estejam corretos conforme definido pela biblioteca Express.
    """typescript
    import { Request, Response } from 'express';

    app.get('/user/:id', (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        if (isNaN(id) || id < 1) {
            return res.status(400).json('ID inválido.');
        }
        // Continuação do código existente...
    });
    """
    - Consistência na Resposta
    Utilizamos a tipagem para os parâmetros da função, melhorando a verificação de tipo e prevenindo possíveis erros de execução.
    """typescript
    app.get('/user/:id', (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        const user = userList.find(user => user.id === id);
        if (!user) {
            return res.status(404).json('Não há nenhum usuário com o ID' + id);
        }
        res.status(200).json(user);
    });
    """
    - Refatoração para Maior Clareza e Eficiência
    A desestruturação é usada para extrair name e email, e a tipagem explícita de req e res assegura que os usos das propriedades desses objetos estão corretos.
    """typescript
    app.patch('/user/:id', (req: Request, res: Response) => {
        const { name, email } = req.body;
        if (!name && !email) {
            return res.status(400).json('Forneça o nome ou o e-mail para atualizar.');
        }
        // Continuação do código existente...
    });
    """
    - Separação de Responsabilidades: Separar a lógica de controle e modelo de dados para manter o código organizado e facilitar futuras manutenções.

    ### Elogio:
    - Qualidade do Código: O código é funcional e bem estruturado, abordando de maneira eficaz as operações necessárias para a gestão de usuários, mostrando bom uso das funcionalidades do Express.js.
`
