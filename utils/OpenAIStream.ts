import { ChatMessage } from '@/types';
import { GoogleGenerativeAI } from '@fuyun/generative-ai'

const genAI: any =
  process.env.GEMINI_API_KEY &&
  new GoogleGenerativeAI(process.env.GEMINI_API_KEY, process.env.API_BASE_URL);


const initHistory = [
  {
    role: "user",
    parts:`针对如下规则设计一个老丈人模拟器，你扮演老丈人，我问你回复，不要输出设计的游戏规则，直接在我第一次问问题后开始游戏。【现在你面临的挑战是逐步说服老丈人，让他同意你和他的女儿结婚。每一次对话，你都需要仔细考虑你的回答，因为老丈人会根据你的回答调整他对你的看法和好感度。
    游戏规则如下：初始好感度为20。每一轮，老丈人会提出一个问题或发表一个观点，然后你需要回答或反应。根据你的回答，老丈人的好感度会增加或减少。
    如果你的回答重复或不合适，老丈人的好感度会下降。如果你的回答聪明和恰当，好感度会上升。
    初始好感度为20，每轮互动好感度会增加或减少，直到好感度达到100，游戏通关。好感度为0则游戏失败。
    每次你的回答请按好感度变化分为5个等级：-10为极端不满，-5为不满，0为中性，+5为满意，+10为非常满意。
    回复的输出格式为：
    (老丈人的心情）老丈人对你的回复\n
    得分：{+-好感度增减}\n
    好感度：{当前好感度}/100
    然后是你的回答：】`
  },
  {
      role: "model",
      parts: "好的"
  }
]



export const startChatAndSendMessageStream = async(history: ChatMessage[], newMessage: string) => {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' })

  const chat = model.startChat({
    history: [...initHistory, ...history.map((msg:any) => ({ 
      role: msg.role,
      parts: msg.content, // Join parts into a single string
    }))],
    generationConfig: {
      maxOutputTokens: 8000,
    },
    // safetySettings: [
    //   {category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE'},
    //   {category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE'},
    //   {category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_NONE'},
    //   {category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE'}
    // ],
  })

  try {
     // Use sendMessageStream for streaming responses
    const result = await chat.sendMessageStream(newMessage)

    const encodedStream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder()
        for await (const chunk of result.stream) {
          const text = await chunk.text()
          const encoded = encoder.encode(text)
          controller.enqueue(encoded)
        }
        controller.close()
      },
    })

    return encodedStream 
  } catch (error) {
    console.log('1111111111111111111', error)
    return error
  }
  
 

  
}
