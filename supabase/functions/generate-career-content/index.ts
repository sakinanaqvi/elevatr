import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import "https://deno.land/x/xhr@0.1.0/mod.ts"

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
      },
    })
  }

  try {
    const { rawNotes, role, tone } = await req.json()

    if (!rawNotes || !role || !tone) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: rawNotes, role, tone' }),
        { 
          status: 400,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
          },
        }
      )
    }

    const openaiApiKey = Deno.env.get('OPENAI_API_KEY')
    if (!openaiApiKey) {
      return new Response(
        JSON.stringify({ error: 'OpenAI API key not configured' }),
        { 
          status: 500,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
          },
        }
      )
    }

    const prompt = `You are an expert career coach and storytelling specialist. Your task is to transform raw career experiences into compelling, tailored professional content.

USER PROFILE:
- Target Role: ${role}
- Preferred Tone: ${tone}
- Raw Experience Notes: ${rawNotes}

ANALYSIS INSTRUCTIONS:
1. Carefully analyze the user's notes to identify:
   - Key achievements and quantifiable results
   - Technical skills and tools mentioned
   - Leadership experiences and team collaboration
   - Problem-solving instances and creative solutions
   - Industry-specific terminology and context

2. Tailor your response specifically for a ${role} position by:
   - Using relevant industry keywords and terminology
   - Highlighting skills most valued in ${role} roles
   - Structuring content to match ${role} expectations
   - Emphasizing achievements that align with ${role} responsibilities

3. Apply the ${tone} tone consistently by:
   - Professional: Formal language, quantified results, industry standards
   - Friendly: Approachable language while maintaining professionalism
   - Bold: Confident statements, strong action verbs, ambitious framing

GENERATE EXACTLY THIS JSON STRUCTURE:

{
  "linkedinBullets": [
    "Action-verb driven bullet with specific metrics/results tailored for ${role}",
    "Skills-focused bullet highlighting relevant technologies/methodologies for ${role}", 
    "Impact-oriented bullet showing leadership/collaboration relevant to ${role}"
  ],
  "starStory": {
    "situation": "Context that resonates with ${role} challenges (2-3 sentences)",
    "task": "Responsibility that aligns with ${role} expectations (2-3 sentences)",
    "action": "Specific actions showcasing ${role} skills and methodologies (3-4 sentences)",
    "result": "Quantified outcomes valuable to ${role} hiring managers (2-3 sentences)"
  },
  "headline": "Compelling ${role}-focused headline under 120 characters"
}

QUALITY REQUIREMENTS:
- Extract and amplify actual achievements from the notes
- Use specific numbers, percentages, and metrics when available
- Include relevant technical skills and methodologies
- Ensure all content is authentic to the user's experience
- Make every word count - be concise but impactful
- Use industry-appropriate language for ${role}
- Maintain ${tone} voice throughout all content

Return ONLY the JSON object, no additional text or explanation.`

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
      }),
    })

    if (!response.ok) {
      const errorData = await response.text()
      console.error('OpenAI API error:', errorData)
      return new Response(
        JSON.stringify({ error: 'Failed to generate content' }),
        { 
          status: 500,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
          },
        }
      )
    }

    const data = await response.json()
    const content = data.choices[0].message.content

    if (!content) {
      return new Response(
        JSON.stringify({ error: 'No content received from OpenAI' }),
        { 
          status: 500,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
          },
        }
      )
    }

    try {
      const parsedContent = JSON.parse(content)
      return new Response(JSON.stringify(parsedContent), {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
      })
    } catch (parseError) {
      console.error('Failed to parse OpenAI response:', content)
      return new Response(
        JSON.stringify({ error: 'Failed to parse AI response' }),
        { 
          status: 500,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
          },
        }
      )
    }
  } catch (error) {
    console.error('Edge function error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
      }
    )
  }
})