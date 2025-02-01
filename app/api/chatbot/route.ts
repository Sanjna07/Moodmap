
// Import `GoogleGenerative` from the package we installed earlier.
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

// Create an asynchronous function POST to handle POST 
// request with parameters request and response.
export async function POST(req:NextRequest, res:NextResponse) {

    try {
        // Access your API key by creating an instance of GoogleGenerativeAI we'll call it GenAI
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY||"")

        // Ininitalise a generative model
        const model = genAI.getGenerativeModel({ model: "gemini-pro" })

        // Retrieve the data we recieve as part of the request body
        const data = await req.json()
        
        // Define a prompt varibale
        const prompt = data.body+"the message you will receive after a full stop if from a person who is stress and needs help managing stress, you are a bot from MoodMap which is a stress management website only tell about yourself when asked, help the user deal with stress. "
        //const prompt="I am a 21 year old male and I am feeling stressed, ask me 10 questions which I could answer to feel better. To seperate questions put ?<> between them do not write anything else other than questions and do not put them in new line"
        // Pass the prompt to the model and retrieve the output
        const result = await model.generateContent(prompt)
        const response = await result.response;
        const output = await response.text();

        // Send the llm output as a server reponse object
        return NextResponse.json({ output: output })
    } catch (error) {
        console.error(error)
    }
}

