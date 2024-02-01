import { ChatMessage } from '@/types';
import { GoogleGenerativeAI } from '@fuyun/generative-ai'

const genAI: any =
  process.env.GEMINI_API_KEY &&
  new GoogleGenerativeAI(process.env.GEMINI_API_KEY, process.env.API_BASE_URL);


const initHistory = [
  {
    role: "user",
    parts:`这是一个文字游戏，你是玩家，要挑战老丈人。每次输入即为你的回复，老丈人为系统模拟，一问一答，循环下去，不要连续对话
    你现在面临的挑战是说服老丈人把他的女儿嫁给你。根据你的角色设定（如程序员、公务员等），老丈人对你的第一印象和好感度会有所不同。
    你的职业、家庭背景和性格特点将影响游戏的难度和对话内容。
    游戏规则如下：初始好感度根据你的角色设定而定，从低到高不等。游戏开始时，会根据你的角色生成一个场景，描述老丈人对你的看法。
    你回复后，然后老丈人会根据你的回复进行反应。
    每次根据你的回复，老丈人的反应会包括他的心情和好感度变化。
    如果你的回复重复或不恰当，老丈人的好感度会降低。如果你的条件优秀，老丈人会更容易被说服。
    初始好感度根据角色设定变化，每次互动好感度会增加或减少，直到好感度达到100，游戏通关。好感度为0则游戏失败。
    每次你的回复请按好感度变化分为5个等级：-10为极端不满，-5为不满，0为中性，+5为满意，+10为非常满意。
    以下游戏规则非常重要，确保充分理解！！！
    除了第一次回复外，其他的回复输出格式为：
    【(老丈人的心情）老丈人说的话\n
    得分：{+-好感度增减}\n
    好感度：{当前好感度}/100`】
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
