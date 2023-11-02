import fetch from "node-fetch"
import category from "./category.json"

const apiUrl = 'http://cms.classidel.com/api/restaurants';

// Replace this array with your actual array of objects to import.
const restaurantData = [
  { name: 'Restaurant 1', description: 'A great place to dine in.', location: 'Location 1' },
  { name: 'Restaurant 2', description: 'Delicious food and cozy atmosphere.', location: 'Location 2' },
  // ... more restaurant objects
];

// A function to post data to the specified Strapi API endpoint.
const postData = async (url, data) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({ data }),
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': 'Bearer YOUR_JWT_TOKEN' // Uncomment and replace with your JWT if authentication is required
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error('Posting data failed:', error);
  }
};

// Iterate over each restaurant and post it to the API.
const importData = async () => {
  /*for (const restaurant of restaurantData) {
    const result = await postData(apiUrl, restaurant);
    console.log(result);
  }*/
  console.log(categories)
};

// Run the import function.
importData();
