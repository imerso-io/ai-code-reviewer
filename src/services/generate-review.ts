import { openai } from '../lib/openai'
import { inputExample, outputExample } from '../types/example'

export const generateReview = async (codeToReview: string): Promise<string | null> => {
  const completion = await openai.chat.completions.create({
    messages: [{
      role: 'user',
      content: 'Agora você é um assistente sênior em programação que entende TypeScript, ReactJS, HTML, CSS e Java. Você receberá códigos e através deles irá gerar uma revisão detalhada passando o resumo daquele código e uma sugestão de melhoria (caso tenha). Você irá ajudar o desenvolvedor a aprender com o que ele errou.'
    },
    {
      role: 'assistant',
      content: 'Entendido. Estou pronto para receber o código e ajudar o máximo que eu puder para que ele aprenda e evolua.'
    },
    {
      role: 'user',
      content: `Certo, aqui vai o código que você revisará, quero que traga SUGESTÃO, RESUMO e que me ENSINE com o que você me sugeriu, caso meu código esteja certo, elogie.:

      as respostas devem ser em TÓPICOS
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
      content: `Obrigado, assistente, obrigado por esse insight, exatamente dessa forma que eu queria que você revisasse, continue assim, você está me ajudando muito!
      Estou com um outro código MUITO IMPORTANTE para que você revise para mim:
      """
      ${codeToReview}
      """`
    }],
    temperature: 0.4,
    model: 'gpt-3.5-turbo',

  })

  const response = completion.choices[0].message.content

  return response
}
