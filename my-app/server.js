import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import axios from 'axios';

require('dotenv').config({ path: '.env.local' });

const app = express();
app.use(cors());
app.use(express.json());

// Specific route for task improvement
app.post('/api/improve-task', async (req, res) => {
  const { title, description } = req.body;
  const API_KEY = import.meta.env.VITE_HUGGINGFACE_API_KEY;

  console.log('Title:', title);
  console.log('Description:', description);
  console.log('API_KEY:', API_KEY);
  console.log('All env variables:', process.env);
  
  try {
    const response = await axios.post(
      'https://api-inference.huggingface.co/models/OpenAssistant/oasst-sft-1-pythia-12b',
      {
        inputs: `Rewrite the task with a clear, specific title and a detailed, actionable description.

Original Task:
Title: ${title}
Description: ${description}

Improved Task Format:
Title: [New Concise Title]
Description: [New Detailed Description]

Improved Task:`,
        parameters: {
          max_new_tokens: 100,
          temperature: 0.7,
        }
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.VITE_HUGGINGFACE_API_KEY}`
        }
      }
    );

    const generatedText = response.data[0]?.generated_text || "";
    
    const titleRegex = /Title:\s*\[?([^\]]+)\]?/i;
    const descriptionRegex = /Description:\s*\[?([^\]]+)\]?/i;

    const titleMatch = generatedText.match(titleRegex);
    const descriptionMatch = generatedText.match(descriptionRegex);

    const newTitle = titleMatch 
      ? titleMatch[1].trim() 
      : title;

    const newDescription = descriptionMatch 
      ? descriptionMatch[1].trim() 
      : description;

    res.json({
      optimizedTitle: newTitle,
      optimizedDescription: newDescription
    });
  } catch (error) {
    console.error('Error in task improvement:', error);
    res.status(500).json({ 
      error: 'Failed to improve task',
      details: error.message 
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});