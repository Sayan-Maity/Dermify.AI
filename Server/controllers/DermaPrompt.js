const {Configuration, OpenAIApi } = require("openai");
const DermaPromptModel = require("../models/DermaPromptModel");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_KEY,
});

const openai = new OpenAIApi(configuration);

module.exports.dermaPrompt = async (req, res) => {
  const { userPrompt, language, symptomPrompt } = req.body;
  try {
    const gptResponse = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `I am sending you a disease name(if you are getting two then select the first one), upon that send me detail of that desease in 5 differnt points and also I will be providing you a language medium in which you have to give the response ,
          1. Description (a brief description about the disease)
          2. Symptoms (give atleast 10 symptoms of the disease)
          3. Causes (give atlease 5 causes of the disease)
          4. Communicable (whether the disease is communicable or not, give response in true or false)
          5. Treatment (give atleast 3 best possible way for the treatment of this disease)
          6. Link (give a wikipedia link related to the below disease)

          Name of Disease = ${userPrompt}
          Language = ${language}
          
          give me the output in json :
          [
            {
              "name": "",
              "description": "",
              "symptoms": ["", "", "", "", "", "", "", "", "", ""],
              "causes": ["", "", "", "", ""],
              "communicable": "",
              "treatment": ["", "", ""],
              "link": "",
            },
          ]`,
        },
      ],
      max_tokens: 2000,
      temperature: 0.9,
    });

    // Parse the JSON response from OpenAI
    // const gptResponseData = JSON.parse(gptResponse.choices[0].message);

    // Create a new Disease document
    // await DermaPromptModel.create({
    //   name: userPrompt, // Assuming 'userPrompt' contains the disease name
    //   description: gptResponseData[0].description,
    //   symptoms: gptResponseData[0].symptoms,
    //   causes: gptResponseData[0].causes,
    //   communicable: gptResponseData[0].communicable,
    //   treatment: gptResponseData[0].treatment,
    // });
    if (gptResponse) {
      // console.log(gptResponse.choices[0].message);
      res.status(200).json({ gptPrompt: gptResponse.data.choices[0].message });
    }
  } catch (err) {
    // console.log(err);
    res.status(500).json({ error: "Server Error" });
  }
};
