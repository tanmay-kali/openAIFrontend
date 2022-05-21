 const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);


async function resp(){
    const response = await openai.createCompletion("text-davinci-002", {
        prompt: "\n\nQ: Most used iphone? \nA:",
        temperature: 0,
        max_tokens: 100,
        top_p: 1,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
        stop: ["\n"],
      });
  console.log(response.data.choices[0].text)
}

const data = {
    prompt: "Write a poem about a dog wearing skis",
    temperature: 0.5,
    max_tokens: 64,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
   };
    
   const res = fetch("https://api.openai.com/v1/engines/text-curie-001/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer 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",
    },
    body: JSON.stringify(data),
   });
   
console.log(res)

