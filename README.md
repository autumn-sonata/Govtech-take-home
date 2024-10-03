# Govtech-take-home

## Running the project
- To run the full project, access: `http://13.229.231.74:3000`
- However, you can also run `docker-compose up` from the root directory but without the MongoDB set up.

## NOTE: Assumptions
- Click the "CLEAR ALL" button if loading a new set of teams. Otherwise, the wrong teams may be shown. 
- It is assumed that there will only be 12 teams involved, and that there are 6 teams in each group. Therefore, we also assume that there exists only 2 groups.
- The match information and search team matches should only be filled in and submitted after the teams have been entered, or else there will be errors.

## Improvements
- Authentication could have been implemented with login for the admin and user, with differing capabilities. This could be supplemented with Firebase.
- Additional robustness on user input could be done. Currently, the implementation uses regex to an extent, but an argument could be done about having an autocorrect. 
- No test cases were provided for this project. However, with additional time, unit test cases could have been provided using Jest and Playwright.