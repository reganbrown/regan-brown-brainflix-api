# BrainFlix-API

Instructions: edit the .env.example file to be a .env file, use the default values set there or change to your own preferences. In the future, space for sensitive data like API keys will also be included in the example file with no default value, and they will need to be retrieved with additional steps that will be included in the README files.

This API may return a 400 or 404 error

## Routes

GET /videos

- returns an array of video objects
- Contains Title, Channel, Thumbnail and ID

GET /videos/:id

- :id must be swapped out with the ID of a video in the database
- Returns the full details of the single video

POST /videos

- uploads a new video to the database

POST /videos/:id/comments

- uploads a comment to the video selected by :id

DELETE /videos/:id/comments/:commentid

- deletes the selected comment from the database
