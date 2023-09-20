const OpenAIApi = require("openai");

const openai = new OpenAIApi({
  apiKey: process.env.OPENAI_KEY,
});

module.exports.recommendationPrompt = async (req, res) => {
  const { skinType, skinConcern } = req.body;
  try {
    const gptResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `I am sending you my skin type and skin concerns and upon that you have to recommend skin care routine ,
          1. Description (a brief and elaborative info about the skin type and skin concern user is facing)
          2. Specialized Treatment (give atleast 5 ways for the treatment)
          3. Daily Skin Care Routine (give atleast 5 skin care daily routine for the below skin type and skin concern)
          4. Weekly Skin Care Routine (give atleast 5 skin care weekly routine for the below skin type and skin concern)
          5. Hydration and Diet (give atleast 5 tips to remain hydrated and follow a proper diet)
          6. Advice (give some advices)
          
          Skin Type = ${skinType}
          Skin Concerns = ${skinConcern}
          
          give me the output in json :
          
          [
          {
            "skinType": "",
            "skinConcerns": "",
            "description": "",
            "specializedTreatment": ["", "", "", "", "", "", ""],
            "dailyRoutine": ["", "", "", "", ""],
            "weeklyRoutine": ["", "", "", "", ""],
            "hydrationAndDiet": ["", "", ""],
            "advice": ["", "", ""]
          },
          ]`,
        },
      ],
      max_tokens: 2000,
      temperature: 0.9,
    });

    if (gptResponse) {
    //   console.log(gptResponse.choices[0].message);
      res.status(200).json({ gptPrompt: gptResponse.choices[0].message });
    }
  } catch (err) {
    // console.log(err);
    res.status(500).json({ error: "Server Error" });
  }
};
