const DEEPSEEK_API_URL = "https://api.siliconflow.cn/v1/chat/completions";
const API_KEY = import.meta.env.VITE_API_KEY;

export const sendMessageToDeepSeek = async (
  messages: Array<{ role: string; content: string }>,
  config: {
    model?: string;
    temperature?: number;
    max_tokens?: number;
  } = {},
  onMessage?: (text: string) => void
): Promise<string> => {
  const response = await fetch(DEEPSEEK_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
        // 模型名称，如果没有传 config.model，则使用默认模型 "deepseek-ai/DeepSeek-R1"
        model: config.model || "deepseek-ai/DeepSeek-R1",
        // 消息内容，是一个数组，包含用户和 AI 的历史对话
        messages,
        // 温度系数，控制生成文本的随机性，范围 0~2，值越大越随机，建议 0.6~1.0 之间
        temperature: config.temperature ?? 0.6,
        // 是否启用“思考模式”（DeepSeek 特有参数），启用后模型会内部推理再生成答案
        enable_thinking: true,
        // 惩罚频率，避免重复用词，值越大越倾向于不重复内容，范围一般是 0~2
        frequency_penalty: 0.5,
        // 最大生成 Token 数（生成字数上限），建议根据模型总 token 限制设置，比如 2048
        max_tokens: config.max_tokens ?? 2048,
        // 控制罕见词概率的下限，类似 top_p 的补充筛选策略，值越低生成内容越保守
        min_p: 0.05,
        // 生成几个候选回答（大部分场景用不到，默认为 1）
        n: 1,
        // 指定停止生成的触发词数组，模型生成过程中一旦出现这些词就会终止输出
        stop: [],
        // 启用流式响应，边生成边返回内容
        stream: true,
        // 思考 token 预算（DeepSeek 特有参数），决定“思考”内容占用多少 token，建议值如 4096
        thinking_budget: 4096,
        // 从 top_k 个最高概率词中选词（词汇筛选策略之一），值越大越开放
        top_k: 50,
        // 从 top_p 概率累计值中采样（常见采样策略），值越低越保守，建议 0.7~0.9
        top_p: 0.7
    }),
  });

  if (!response.ok || !response.body) {
    throw new Error("Failed to get stream response from DeepSeek API");
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder("utf-8");

  let fullResponse = "";
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n").filter((line) => line.trim() !== "");
    buffer = ""; // reset buffer

    for (const line of lines) {
      if (line.startsWith("data: ")) {
        const data = line.replace("data: ", "");
        if (data === "[DONE]") {
          return fullResponse;
        }

        try {
          const parsed = JSON.parse(data);
          const content =
            parsed.choices?.[0]?.delta?.content ||
            parsed.choices?.[0]?.delta?.reasoning_content ||
            "";

          if (content) {
            fullResponse += content;
            console.log("content", content);

            onMessage?.(content); // callback 实时更新
          }
        } catch (err) {
          console.warn("Error parsing chunk:", err);
        }
      }
    }
  }

  return fullResponse;
};
