// Import necessary modules
import { GoogleGenerativeAI } from "@google/generative-ai";
import Itinerary from '../models/Itinerary.js';
import axios from 'axios';

// Replace 'YOUR_API_KEY' with your actual API key
const apiKey = 'AIzaSyACbSW3wxtAxrQOpNY4CtZfgAkCEiMtOSQ';

// Initialize GoogleGenerativeAI with your API key
const genAI = new GoogleGenerativeAI(apiKey);

// Route to generate itinerary
export const generateItinerary = async (req, res) => {
  const { source, destination, startDate, endDate, durationInDays } = req.body;

  try {
    const itineraryText = await generateItineraryText(source, destination, startDate, endDate, durationInDays);

    res.json({ itineraryText });
  } catch (error) {
    console.error('Error generating itinerary:', error);
    res.status(500).json({ message: 'Error generating itinerary' });
  }
};

// Route to create a new itinerary
export const createItinerary = async (req, res) => {
  const { source, destination, startDate, endDate, durationInDays, itineraryText } = req.body;

  try {
    const itinerary = new Itinerary({
      source,
      destination,
      startDate,
      endDate,
      durationInDays,
      itineraryText
    });

    await itinerary.save();

    res.status(201).json(itinerary);
  } catch (error) {
    console.error('Error creating itinerary:', error);
    res.status(500).json({ message: 'Error creating itinerary' });
  }
};

// Route to update an existing itinerary
export const updateItinerary = async (req, res) => {
  const { id } = req.params;
  const { itineraryText } = req.body;

  try {
    const updatedItinerary = await Itinerary.findByIdAndUpdate(id, { itineraryText }, { new: true });

    if (!updatedItinerary) {
      return res.status(404).json({ message: 'Itinerary not found' });
    }

    res.json(updatedItinerary);
  } catch (error) {
    console.error('Error updating itinerary:', error);
    res.status(500).json({ message: 'Error updating itinerary' });
  }
};

// Function to format the generated itinerary text
function formatItinerary(generatedText, currentDate) {
  return generatedText.replace(/\*\*/g, "").replace(/Morning/g, `Morning (${currentDate.toDateString()})`);
}

// Function to generate itinerary text
async function generateItineraryText(source, destination, startDate, endDate, durationInDays) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  let itineraryText = "Planned Itinerary\n";
  let currentDate = new Date(startDate);

  let cultureNoted = false; // Flag to ensure culture notes are included only once

  for (let day = 1; currentDate <= new Date(endDate); day++) {
    let prompt = `Generate a personalized trip itinerary for a 1-day trip from ${source} to ${destination} starting on ${currentDate.toISOString().split('T')[0]} and ending on ${currentDate.toISOString().split('T')[0]}, with an optimum budget (Currency: INR). Describe the weather that month. Keep to a maximum travel area to the size of Hokkaido, if possible, to minimize traveling time between cities.\n\nFor this day, list me the following:\n- One attraction suitable for that season ACCORDING TO DATE GIVEN\n`;

    if (!cultureNoted) {
      prompt += "- Tip: Respect the local customs and traditions.\n";
      cultureNoted = true;
    }

    const result = await model.generateContent(prompt);
    const response = await result.response;

    itineraryText += `Day ${day}\n${formatItinerary(response.text(), currentDate)}\n\n`;
    currentDate.setDate(currentDate.getDate() + 1);
  }

  itineraryText += generateSummary();
  return itineraryText;
}

// Function to generate the summary section of the itinerary
function generateSummary() {
  return `\nAccommodation:\n\nTransportation:\n\nFood:\n\nAttractions:\n\nEstimated Budget:\n`;
}
