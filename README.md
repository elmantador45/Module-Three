## Analysis Overview
- This project explores data related to genres, ratings, and relevance using the Watchmode API. 
- It involves gathering data on drama titles, user ratings, and titles similar to "Game of Thrones," analyzing their similarities and ratings to aid in content recommendation strategies.

### Data Collection and Processing
- Utilized Watchmode API to fetch drama titles and their genre IDs.
- Employed Jaccard similarity for genre analysis based on keyword matches.
- Retrieved title details and ratings using asynchronous JavaScript functions.
- Calculated Jaccard similarity scores for titles similar to "Game of Thrones" based on genre composition.
- Integrated fetched data into HTML tables for visual representation.

### Limitations and Considerations
- Limited API calls due to API request constraints.
- Potential bias towards popular genres or titles within API limitations.
- Addressed missing or incomplete data through error handling and data validation.
- Monitored API usage to avoid exceeding limits.
