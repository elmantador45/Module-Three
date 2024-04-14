/*document.addEventListener('DOMContentLoaded', async () => {
  const genreId = '7'; // Genre ID for Drama
  const apiKey = 'PasQqQoOW70Qdk0Wj1Hlpbdb1bqSq260dSDdkHxk'; // Replace with your actual API key

  async function fetchDramaTitles(apiKey, genreId) {
      const apiUrl = `https://api.watchmode.com/v1/list-titles/?apiKey=${apiKey}&source_ids=203,57&genres=${genreId}&limit=10`;

      try {
          const response = await fetch(apiUrl);
          const data = await response.json();
          return data;
      } catch (error) {
          console.error('Error fetching drama titles:', error);
          return null;
      }
  }
I'm commenting this code out because the API I'm using have very limited calls and if I use it too much I'm going to run
out. But here's the explanation. I used this api call to get ten drama titles witht their genre id.
I then used the results from the api call to get the title ids which I used in the folowing api call. 
I measured Jaccard similarity with a keyword: "Drama". if the genres given for said title had the keyword 
then it would he given a jaccard score of 1 and if otherwise, it would be given a score of 0.
due to the nature of the api, it is impossible to lookup titles without their id's so this was the only way.
*/
//345534 this is the id for the game of thrones.
document.addEventListener('DOMContentLoaded', async () => {
  const apiKey = 'ZXud3z80TAYFYuQC8UisKAwDdqcaHQ4Rl8iav801';
  const titleIds = [3164899, 3182516, 35777, 1711030, 1679922, 3190441, 3182191, 547174, 3218648, 3197638];
  const similarTitlesId = 345534;

  async function fetchTitleDetails(apiKey, titleId) {
      const apiUrl = `https://api.watchmode.com/v1/title/${titleId}/details/?apiKey=${apiKey}&append_to_response=sources`;

      try {
          const response = await fetch(apiUrl);
          const data = await response.json();
          return data;
      } catch (error) {
          console.error('Error fetching title details:', error);
          return null;
      }
  }

  async function fetchSimilarTitles(apiKey, titleId) {
      const apiUrl = `https://api.watchmode.com/v1/title/${titleId}/details/?apiKey=${apiKey}&append_to_response=sources`;

      try {
          const response = await fetch(apiUrl);
          const data = await response.json();
          return data;
      } catch (error) {
          console.error('Error fetching similar titles:', error);
          return null;
      }
  }

  function calculateGenreJaccard(genreNames) {
      const requiredGenres = ['Action', 'Drama', 'Fantasy'];
      const intersection = genreNames.filter((genre) => requiredGenres.includes(genre));

      if (intersection.length === 3) return 1; // All three genres present
      if (intersection.length === 2) return 0.66; // Two genres present
      if (intersection.length === 1) return 0.33; // One genre present
      return 0; // None of the required genres present
  }

  const tableBodyGenres = document.getElementById('genresTable').getElementsByTagName('tbody')[0];
  const tableBodyRating = document.getElementById('ratingTable').getElementsByTagName('tbody')[0];
  const tableBodyTitles = document.getElementById('similarTitlesTable').getElementsByTagName('tbody')[0];

  titleIds.forEach(async (titleId) => {
      const titleDetails = await fetchTitleDetails(apiKey, titleId);
      if (titleDetails && titleDetails.genre_names) {
          // Calculate Jaccard similarity for genres
          const genreSimilarity = calculateGenreJaccard(titleDetails.genre_names);

          // Add row to genres table
          const newRowGenres = tableBodyGenres.insertRow();
          newRowGenres.insertCell(0).textContent = titleDetails.title;
          newRowGenres.insertCell(1).textContent = genreSimilarity.toFixed(2);

          // Add row to rating table
          const newRowRating = tableBodyRating.insertRow();
          newRowRating.insertCell(0).textContent = titleDetails.title;
          newRowRating.insertCell(1).textContent = titleDetails.user_rating ? titleDetails.user_rating.toFixed(1) : 'N/A';
      } else {
          // Add "N/A" rows if details are not available
          const newRowGenres = tableBodyGenres.insertRow();
          newRowGenres.insertCell(0).textContent = 'N/A';
          newRowGenres.insertCell(1).textContent = 'N/A';

          const newRowRating = tableBodyRating.insertRow();
          newRowRating.insertCell(0).textContent = 'N/A';
          newRowRating.insertCell(1).textContent = 'N/A';
      }
  });

  // Fetch similar titles and display in third table
  const similarTitles = await fetchSimilarTitles(apiKey, similarTitlesId);
  if (similarTitles && similarTitles.similar_titles) {
      let count = 0; // Counter to limit to ten titles
      for (const titleId of similarTitles.similar_titles) {
          if (count >= 10) break; // Limit to ten titles
          const titleDetails = await fetchTitleDetails(apiKey, titleId);
          if (titleDetails && titleDetails.title && titleDetails.genre_names) {
              const genreSimilarity = calculateGenreJaccard(titleDetails.genre_names);
              const newRowTitles = tableBodyTitles.insertRow();
              newRowTitles.insertCell(0).textContent = titleDetails.title;
              newRowTitles.insertCell(1).textContent = genreSimilarity.toFixed(2);
              count++;
          } else {
              // Add "N/A" rows if title details are not available
              const newRowTitles = tableBodyTitles.insertRow();
              newRowTitles.insertCell(0).textContent = 'N/A';
              newRowTitles.insertCell(1).textContent = 'N/A';
          }
      }
  }
});