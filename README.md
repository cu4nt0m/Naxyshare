
### Description:

The project `NAXYShare` is aimed to provide you your desired video and book resources and a user-friendly channels section so you can share your great results with a member, or a group of members in a channel. All the results are one-to-one match with *Youtube, googleBooks* because of using **Youtube API, Google Books API**, and so much more to come.

### Don't have much time to read all of these?
Here is a quick **[video](https://youtu.be/8Upup2L_c7M)** that shows you the summary of what NAXYShare is all about.

<hr>

### Members:
- Arsalan Harouni Komitaki
- Nicodemus Aprianto
- Xueyao Ma
- Yuning Zhu
- Jordy Hendrix Zeufack Assongmo

<hr>

![facebook_cover_photo_2](https://user-images.githubusercontent.com/67411717/184535527-1ac2470e-c791-47fa-bb78-ecab05f74fb3.png)

### Deployed version:
The project is live on Heroku servers, and you can already use it through: **[NAXYShare](https://naxyshare.herokuapp.com/home)**
![Home](https://user-images.githubusercontent.com/67411717/184536452-0bfb26d2-6331-4004-b855-0cf0251af201.png)

<hr>

### The structure of the project frontend-wise is like the following:
![structure1](https://user-images.githubusercontent.com/67411717/184538909-70bf358e-a215-4326-a1f3-4017ab165132.png)

### Technologies that are used are the following:
![structure2](https://user-images.githubusercontent.com/67411717/184539069-b84dd3a6-0158-4930-aa77-bc5137b704a6.png)

<hr>

### How to run the project locally in your machine and do your own testing:
Both back-end and front-end code are pushed into single repo for documentation purposes but they are basically two different applications with two having different `package.json` and environmental variables. For your own testing, you have to configure the project as follows:
- in `/backend/server.js` , change the database connection to your own desired DB that you want to use.
- Create a `.env` file in the `/backend` and have a **JWT_SECRET** key and value of your choice for the JWT Enc. Decr. to run without any issues.
- The front-end is configured to make API calls to the server which is **deployed** to heroku and is live. In case you want to use the back-end code in your local machine, the domain in the `front-end` has to change to the `http://localhost:PORT`
- TO RUN THE **SERVER**, open a new cmd/terminal window and `cd` into the `backend` directory, then run the script, `npm install` to install the required npm packages, then run `npm run dev` to run the server locally on your machine.
- TO RUN THE **Front-end**, first, make sure to have `Angular-cli` installed on your machine. Then `cd` into the `/frontend` in the project, then run `npm install` to install the required npm packages, and finally run `ng serve` to run the front-end app locally on your machine.

<hr>


You can also watch the Video that we walk you through the app from user's perspective: [Click here for the Video](https://www.youtube.com/watch?v=LoX7_Nr5VfM)

### Here are different sections of [NAXYShare](https://naxyshare.herokuapp.com/home):

![unknown](https://user-images.githubusercontent.com/67411717/184536438-22b0d2a7-b532-4e8d-beb7-8073c579e6fb.png)

![unknown4](https://user-images.githubusercontent.com/67411717/184536455-69c57876-e691-47c1-aee1-302353d92101.png)
![unknown5](https://user-images.githubusercontent.com/67411717/184536460-2a188c3a-fb51-4c08-9f3a-29fe3c2357e2.png)

![unknown8](https://user-images.githubusercontent.com/67411717/184536467-caaa8006-f5ab-4109-83ee-202b3406ab61.png)
![unknown9](https://user-images.githubusercontent.com/67411717/184536471-843987f2-974c-48bb-b21f-bfe583bd9242.png)


