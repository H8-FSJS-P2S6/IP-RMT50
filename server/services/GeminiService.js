const { GoogleGenerativeAI } = require("@google/generative-ai");


async function summarizeJSON(jsonData) {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const jsonString = JSON.stringify(jsonData, null, 2);

    const prompt = `Summarize the following JSON data of a youtube channel:\n\n${jsonString}\n\nSummary:`;

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        return text;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

module.exports = summarizeJSON;