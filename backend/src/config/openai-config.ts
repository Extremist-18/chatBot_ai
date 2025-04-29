import OpenAI from "openai";

export const configureOpenAI=() =>{
    return new OpenAI({
        apiKey: process.env.OPENAI_SECRET,
        organization: process.env.OPENAI_ORGANIZATION_ID,
    });
};


