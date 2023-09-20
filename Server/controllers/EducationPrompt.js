const OpenAIApi = require("openai");

const openai = new OpenAIApi({
  apiKey: process.env.OPENAI_KEY,
});

module.exports.educationPrompt = async (req, res) => {
  const { disease } = req.body;
  try {
    const gptResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `I am sending you a skin disease name, upon that, send me detail of that disease in 5 different points:
          1.  Name (name of the disease)
          2. Description (a brief 200 words description about the disease)
          3. Symptoms (give atleast 10 symptoms of the disease)
          4. Causes (give atlease 5 causes of the disease)
          5. Prevention (give atleast 3 best possible way for the prevention of this disease)
          
          Name of Disease = ${disease}
          
          give me the output in json :
          
          [
          {
            "name" : "",
            "description": "",
            "symptoms": ["", "", "", "", "", "", "", "", "", ""],
            "causes": ["", "", "", "", ""],
            "prevention": ["", "", ""]
          },
          ]`,
        },
      ],
      max_tokens: 2000,
      temperature: 0.9,
    });

    if (gptResponse) {
      // console.log(gptResponse.choices[0].message);
      res.status(200).json({ gptPrompt: gptResponse.choices[0].message });
    }
  } catch (err) {
    // console.log(err);
    res.status(500).json({ error: "Server Error" });
  }
};
