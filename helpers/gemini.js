const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config()

const gemini = async (character) => {
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


    const prompt = `what is the best weapon for ${character} in Genshin Impact. Response must be in format JSON. like this:{
        "character":{
            "name":...
            "recommended_Weapon":...
            "base_Attackk":...
            "imageUrl":...
        }
    },
    create without \`\`\`json and \`\`\``

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();
    // console.log(text);
    text = JSON.parse(text.trim())
    return text;
}

module.exports = gemini