export interface CareerOutputs {
  linkedinBullets: string[];
  starStory: {
    situation: string;
    task: string;
    action: string;
    result: string;
  };
  headline: string;
}

export async function generateCareerOutputs(
  rawNotes: string, 
  role: string, 
  tone: string
): Promise<CareerOutputs> {
  const response = await fetch('https://kdlecgymohugxkeaxeyi.supabase.co/functions/v1/generate-career-content', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      rawNotes,
      role,
      tone,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: 'Network error' }));
    throw new Error(errorData.error || 'Failed to generate content');
  }

  return response.json() as Promise<CareerOutputs>;
}