// "use client" 
// import { useState, useEffect } from 'react';
// import { Mic, Bot } from 'lucide-react';
// import { GoogleGenerativeAI } from '@google/generative-ai';

// interface IWindow extends Window {
//   SpeechRecognition?: any;
//   webkitSpeechRecognition?: any;
// }

// const MODEL_NAME = "gemini-pro";
// const API_KEY = "#";

// const VoiceAssistant = () => {
//   const [isListening, setIsListening] = useState(false);
//   const [isResponding, setIsResponding] = useState(false);
//   const [recognition, setRecognition] = useState<any>(null);
//   const [lastMessage, setLastMessage] = useState('Initializing...');
//   const [model, setModel] = useState<any>(null);
//   const [isModelReady, setIsModelReady] = useState(false);

//   // Initialize Gemini AI and test it
//   useEffect(() => {
//     const initializeAndTestAI = async () => {
//       try {
//         const genAI = new GoogleGenerativeAI(API_KEY);
//         const modelInstance = genAI.getGenerativeModel({ model: MODEL_NAME });
        
//         // Test the model with a simple prompt
//         const testResult = await modelInstance.generateContent("Say hi to the user briefly");
//         const testResponse = await testResult.response.text();
        
//         setModel(modelInstance);
//         setIsModelReady(true);
//         console.log('AI model initialized and tested successfully');
//         setLastMessage(`Assistant: ${testResponse}`);
//         speakResponse(testResponse);
        
//       } catch (error) {
//         console.error('Failed to initialize or test AI model:', error);
//         setLastMessage('Error initializing AI model. Please refresh the page.');
//         setIsModelReady(false);
//       }
//     };

//     initializeAndTestAI();
//   }, []);

//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       const windowWithSpeech = window as IWindow;
//       const SpeechRecognition = 
//         windowWithSpeech.SpeechRecognition || 
//         windowWithSpeech.webkitSpeechRecognition;

//       if (SpeechRecognition) {
//         const recognitionInstance = new SpeechRecognition();
//         recognitionInstance.continuous = false;
//         recognitionInstance.interimResults = false;
//         recognitionInstance.lang = 'en-US';

//         recognitionInstance.onstart = () => {
//           setIsListening(true);
//           setLastMessage('Listening...');
//         };

//         recognitionInstance.onend = () => {
//           setIsListening(false);
//         };

//         recognitionInstance.onresult = async (event: any) => {
//           if (isModelReady) {
//             const transcript = event.results[0][0].transcript;
//             console.log('User said:', transcript);
//             await handleResponse(transcript);
//           } else {
//             setLastMessage('Please wait for AI model to initialize...');
//           }
//         };

//         recognitionInstance.onerror = (event: any) => {
//           console.error('Speech recognition error:', event.error);
//           setIsListening(false);
//           setLastMessage('Error listening. Please try again.');
//         };

//         setRecognition(recognitionInstance);
//       }
//     }
//   }, [isModelReady]); // Add isModelReady as dependency

//   const speakResponse = (text: string) => {
//     setIsResponding(true);
//     setLastMessage(`Assistant: ${text}`);
    
//     const utterance = new SpeechSynthesisUtterance(text);
//     utterance.rate = 1.0;
//     utterance.pitch = 1.0;
//     utterance.volume = 1.0;
    
//     utterance.onend = () => {
//       setIsResponding(false);
//       if (recognition && isModelReady) {
//         setTimeout(() => recognition.start(), 1000);
//       }
//     };
//     window.speechSynthesis.speak(utterance);
//   };

//   const handleResponse = async (userInput: string) => {
//     if (!isModelReady || !model) {
//       console.error('Model not initialized');
//       setLastMessage('AI model is not ready yet. Please wait.');
//       return;
//     }

//     try {
//     //   const medicalPrompt = `You are a medical AI assistant. Provide a clear and concise response. User said: ${userInput}`;
//       const medicalPrompt = `You are a medical AI assistant. Respond clearly and concisely, like you're talking to a doctor. User said: ${userInput}`;

//       const result = await model.generateContent(medicalPrompt);
//       const response = await result.response.text();

//       console.log('AI response:', response);
//       speakResponse(response);
//     } catch (error) {
//       console.error('Error generating AI response:', error);
//       speakResponse("I encountered an issue. Please try again later.");
//     }
//   };

//   const toggleListening = () => {
//     if (!recognition) {
//       alert('Speech recognition is not supported in your browser.');
//       return;
//     }
//     if (!isModelReady) {
//       alert('Please wait for AI model to initialize...');
//       return;
//     }
//     if (isListening) {
//       recognition.stop();
//     } else {
//       window.speechSynthesis.cancel();
//       recognition.start();
//     }
//   };

//   return (
//     <div className="flex flex-col h-screen bg-gray-50 items-center justify-center">
//       <div className="text-center space-y-8">
//         <div className="flex items-center justify-center space-x-4">
//           <Bot className="w-12 h-12 text-blue-500" />
//           <h1 className="text-2xl font-semibold">Voice Medical Assistant</h1>
//         </div>
        
//         {/* <div className="h-16 flex items-center justify-center">
//           <p className="text-gray-600">{lastMessage}</p>
//         </div> */}

//         <button
//           onClick={toggleListening}
//           disabled={isResponding || !isModelReady}
//           className={`
//             p-8 rounded-full transition-all duration-200
//             ${!isModelReady 
//               ? 'bg-gray-300 cursor-not-allowed'
//               : isListening 
//                 ? 'bg-red-500 hover:bg-red-600 scale-110' 
//                 : isResponding
//                   ? 'bg-blue-300 cursor-not-allowed'
//                   : 'bg-blue-500 hover:bg-blue-600'
//             }
//           `}
//         >
//           <Mic className={`w-8 h-8 text-white ${isListening ? 'animate-pulse' : ''}`} />
//         </button>

//         <div className="text-sm text-gray-500">
//           {!isModelReady 
//             ? 'Initializing...' 
//             : isListening 
//               ? 'Listening...' 
//               : isResponding 
//                 ? 'Responding...' 
//                 : 'Click to speak'}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VoiceAssistant;

"use client"
import { useState, useEffect } from 'react';
import { Mic, Bot } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';

interface IWindow extends Window {
  SpeechRecognition?: any;
  webkitSpeechRecognition?: any;
}

const MODEL_NAME = "gemini-pro";
const API_KEY = "#";

const VoiceAssistant = () => {
  const [isListening, setIsListening] = useState(false);
  const [isResponding, setIsResponding] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);
  const [lastMessage, setLastMessage] = useState('Initializing...');
  const [model, setModel] = useState<any>(null);
  const [isModelReady, setIsModelReady] = useState(false);
    const formatResponse = (response: string) => {
  // Remove asterisks and clean up formatting
  let formattedResponse = response.replace(/[\*]{1,2}/g, '');
  
  // Split by numbered sections and format
  const sectionPattern = /(\d+\.\s*[^0-9]+)(?=\d+\.|$)/g;
  const sections: string[] = [];
  
  // Explicitly type the match variable
  let match: RegExpExecArray | null = null;
  
  while ((match = sectionPattern.exec(formattedResponse)) !== null) {
    // Safely access the second capture group
    if (match[1]) {
      sections.push(match[1].trim());
    }
  }
  
  // If no sections found, return original response
  return sections.length > 0 
    ? sections.map((section) => `${section}\n`).join('\n').trim()
    : formattedResponse;
};
  // Initialize Gemini AI and test it
  useEffect(() => {
    const initializeAndTestAI = async () => {
      try {
        const genAI = new GoogleGenerativeAI(API_KEY);
        const modelInstance = genAI.getGenerativeModel({ model: MODEL_NAME });
        
        // Initial greeting
        // const initialPrompt = "Respond in exactly 10 words: Introduce yourself as a medical voice assistant";
        // const testResult = await modelInstance.generateContent(initialPrompt);
        // const testResponse = await testResult.response.text();
        
        setModel(modelInstance);
        setIsModelReady(true);
        console.log('AI model initialized successfully');
        // speakResponse(testResponse);
        
      } catch (error) {
        console.error('Failed to initialize AI model:', error);
        setLastMessage('Error initializing AI model. Please refresh the page.');
        setIsModelReady(false);
      }
    };

    initializeAndTestAI();
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const windowWithSpeech = window as IWindow;
      const SpeechRecognition = 
        windowWithSpeech.SpeechRecognition || 
        windowWithSpeech.webkitSpeechRecognition;

      if (SpeechRecognition) {
        const recognitionInstance = new SpeechRecognition();
        recognitionInstance.continuous = false;
        recognitionInstance.interimResults = false;
        recognitionInstance.lang = 'en-US';

        recognitionInstance.onstart = () => {
          setIsListening(true);
          setLastMessage('Listening...');
        };

        recognitionInstance.onend = () => {
          setIsListening(false);
        };

        recognitionInstance.onresult = async (event: any) => {
          if (isModelReady) {
            const transcript = event.results[0][0].transcript;
            console.log('User said:', transcript);
            await handleResponse(transcript);
          } else {
            setLastMessage('Please wait for initialization...');
          }
        };

        recognitionInstance.onerror = (event: any) => {
          console.error('Speech recognition error:', event.error);
          setIsListening(false);
          setLastMessage('Error listening. Please try again.');
        };

        setRecognition(recognitionInstance);
      }
    }
  }, [isModelReady]);

  const speakResponse = (text: string) => {
    setIsResponding(true);
    setLastMessage(`Assistant: ${text}`);
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9; // Slightly slower for clarity
    utterance.pitch = 1.0;
    utterance.volume = 1.0;
    
    utterance.onend = () => {
      setIsResponding(false);
      if (recognition && isModelReady) {
        setTimeout(() => recognition.start(), 1000);
      }
    };
    window.speechSynthesis.speak(utterance);
  };

  const handleResponse = async (userInput: string) => {
    if (!isModelReady || !model) {
      console.error('Model not initialized');
      return;
    }

    try {
      // Enforce brief responses with specific word limit
      const prompt = `You are a medical voice assistant. Keep your response under 20 words. 
                     Be direct and conversational. User said: ${userInput}`;

      const result = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: prompt }]}],
      });
      
      const response = await result.response.text();
      console.log('AI response:', response);
      speakResponse(formatResponse(response));
    } catch (error) {
      console.error('Error generating AI response:', error);
      speakResponse("Sorry, please try again.");
    }
  };

  const toggleListening = () => {
    if (!recognition) {
      alert('Speech recognition is not supported in your browser.');
      return;
    }
    if (!isModelReady) {
      alert('Please wait for initialization...');
      return;
    }
    if (isListening) {
      recognition.stop();
    } else {
      window.speechSynthesis.cancel();
      recognition.start();
    }
  };

  return (
    // <div className="flex flex-col h-screen bg-gray-50 items-center justify-center">
    //   <div className="text-center space-y-8">
    //     <div className="flex items-center justify-center space-x-4">
    //       <Bot className="w-12 h-12 text-blue-500" />
    //       <h1 className="text-2xl font-semibold">Voice Medical Assistant</h1>
    //     </div>

    //     <button
    //       onClick={toggleListening}
    //       disabled={isResponding || !isModelReady}
    //       className={`
    //         p-8 rounded-full transition-all duration-200
    //         ${!isModelReady 
    //           ? 'bg-gray-300 cursor-not-allowed'
    //           : isListening 
    //             ? 'bg-red-500 hover:bg-red-600 scale-110' 
    //             : isResponding
    //               ? 'bg-blue-300 cursor-not-allowed'
    //               : 'bg-blue-500 hover:bg-blue-600'
    //         }
    //       `}
    //     >
    //       <Mic className={`w-8 h-8 text-white ${isListening ? 'animate-pulse' : ''}`} />
    //     </button>

    //     <div className="text-sm text-gray-500">
    //       {!isModelReady 
    //         ? 'Initializing...' 
    //         : isListening 
    //           ? 'Listening...' 
    //           : isResponding 
    //             ? 'Responding...' 
    //             : 'Click to speak'}
    //     </div>
    //   </div>
    // </div>

    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900 items-center justify-center">
  <div className="text-center space-y-8">
    <div className="flex items-center justify-center space-x-4">
      <Bot className="w-12 h-12 text-blue-500 dark:text-blue-400" />
      <h1 className="text-2xl font-semibold dark:text-white">Voice Medical Assistant</h1>
    </div>

    <button
      onClick={toggleListening}
      disabled={isResponding || !isModelReady}
      className={`
        p-8 rounded-full transition-all duration-200
        ${!isModelReady 
          ? 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed'
          : isListening 
            ? 'bg-red-500 dark:bg-red-600 hover:bg-red-600 dark:hover:bg-red-700 scale-110' 
            : isResponding
              ? 'bg-blue-300 dark:bg-blue-700 cursor-not-allowed'
              : 'bg-blue-500 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700'
        }
      `}
    >
      <Mic className={`w-8 h-8 text-white ${isListening ? 'animate-pulse' : ''}`} />
    </button>

    <div className="text-sm text-gray-500 dark:text-gray-400">
      {!isModelReady 
        ? 'Initializing...' 
        : isListening 
          ? 'Listening...' 
          : isResponding 
            ? 'Responding...' 
            : 'Click to speak'}
    </div>
  </div>
</div>

  );
};

export default VoiceAssistant;