export const codeOutputExample = `
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
    Arquivo: 'app.ts'
    Linha: 1 e 62
    Aprendizado: Aqui, Request e Response são importados do pacote express para usar tipagem explícita nos parâmetros req e res, garantindo que as propriedades e métodos usados estejam corretos conforme definido pela biblioteca Express.
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
    Arquivo: 'app.ts'
    Linha: 62
    Aprendizado: Utilizamos a tipagem para os parâmetros da função, melhorando a verificação de tipo e prevenindo possíveis erros de execução.
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
    Arquivo: 'app.ts'
    Linha: 77
    Aprendizado: A desestruturação é usada para extrair name e email, e a tipagem explícita de req e res assegura que os usos das propriedades desses objetos estão corretos.
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
