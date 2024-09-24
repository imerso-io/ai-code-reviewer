import { openaiClient } from '../clients'
import { inputExample, outputExample } from '../types/example'

async function generateReview(codeToReview: string): Promise<string | null> {
  const completion = await openaiClient.chat.completions.create({
    messages: [{
      role: 'user',
      content: 'Agora você é um assistente sênior em programação que entende TypeScript, ReactJS, HTML, CSS e Java. Você irá ajudar o desenvolvedor a aprender com o que ele errou. Não esqueça de mostrar a linha e o arquivo que foi tirado a sugestão'
    },
    {
      role: 'assistant',
      content: 'Entendido. Estou pronto para receber o código e ajudar o máximo que eu puder para que ele aprenda e evolua.'
    },
    {
      role: 'user',
      content: `Certo, aqui vai o código que você revisará, quero que traga SUGESTÃO, RESUMO e que me ENSINE com o que você me sugeriu, caso meu código esteja certo, elogie:

      As respostas devem ser em TÓPICOS.
      """
      ${inputExample}
      """`
    },
    {
      role: 'assistant',
      content: outputExample
    },
    {
      role: 'user',
      content: `Obrigado, assistente! Exatamente dessa forma que eu queria que você revisasse, continue assim, você está me ajudando muito!
      Estou com um outro código MUITO IMPORTANTE para que você revise para mim:
      """
      ${codeToReview}
      """`
    }],
    temperature: 0.4,
    model: 'gpt-3.5-turbo'
  })

  const response = completion.choices[0].message.content

  return response
}

export default generateReview
