# File Archive Prototyp

I've built a web app that can be used as a file archive. 
User can upload and download jpg, jpeg, png, pdf, xml files.
When uploading a file, user can add description of the file and needs to provide the name of the uploader. 
User can delete the uploaded files as well.  
The uploaded files are presented in the form of a table with;
- icon indicating file type
- file name
- description
- uploaded by
- uploaded at 

## Technologies used 
This is a full-stack project. I've used a template from my previous full-stack projects for Technigo Frontend Bootcamp that has been created using creat-react-app. 

### Back-end
- JavaScript
- Mongoose
- MongoDB
- Cloudinary
- Node.js
- Express
- REST API
- Postman
- Heroku

I've chosen to use these technologies for the backend mainly because I have previously used them in other projects. Since the goal was to build a file archive, I knew that I could use Cloudinary to upload image files. I started with a plan of having a database model for file with Mongoose, MongoDB and Cloudinary. This was followed by setting up REST API.

### Front-end
- JavaScript
- React+Redux
- styled-components
- react-table 
- Netlify

I also chose most of the technologies for frontend based on familiarity, except the react-table library. I chose to use the library for building a table component because I couldn't come up with a smart and clear plan to build a data table myself in given time. I started with drawing the most basic UI for the file table and file upload interface. This was followed by setting up the reducer and thunks for the fetch requests via frontend. 

## The problem 
### react-table
The table library that I chose to use came with set of code that I couldn't understand fully. In order to customise the table for my purpose, I had to consult tutorial, react-table documentation, similar questions on StackOverFlow and some experimenting on my own. For example react-table came with the precoded bit which printed out the json object of selected row below the table. This code wasn't needed for my app but it worked as a clue for me to access the id and url of each file, which I used in order to delete or download files. 

### Cloudinary
I spent the biggest chunk of time and effort in dealing with Cloudinary in this project. In order to access the original file name of uploaded files and to download the files as an attachment on client-side, I needed to find the respective parameters for CloudinaryStorage. This was challenging because I couldn't find many examples dealing with the same issue using same framework, therefore more difficult to guess the right syntax. I read through Cloudinary's documentation, Q&A articles, similar problems at StackOverFlow and experimented with adapting different parameters into my code. I contacted support team at Cloudinary and they actually gave me great support, including lifting their ban of PDF delivery for my Cloudinary account which was causing the problem of 404 error when trying to open/download the uploaded PDF files on client-side.  

### Debugging
I reached out to my former classmates and alumnus at Technigo during the assignment for help. For example I got bad request when trying to upload file on client-side and couldn't figure out the source of error. I've got help debugging this issue from a Technigo alumni, where the solution was to remove the header in the fetch request. Another bug was that when a row was selected, deleting function was fired without onClick trigger. I've got help from a Technigo alumni again to troubleshoot this. It was strangely caused by a styled-component Button. When changed to normal button, the issue was gone. 

## Most proud of
I'm proud that I could tweak react-table to achieve the requirements. I've added a column for icons indicating file type and the logic to detect file type. I used and tweaked their pagination function so that it would show 5 files per page as default. I used their precoded part for useSelectRow as a hint to get access to the id and url of a selected file in the table component. I'm also proud that I made the Cloudinary work for this app and that I made use of all the help that I could get. It was really great of people willing to help out, and super nice to experience that it actually helps to contact the service team directly sometimes instead of looking at hundreds of similar q&a articles.

## If I had more time
I would have tried to approach the table component differently, preferably build it myself so that I don't have to deal with complicated library. For instance I couldn't wrap each file name with link or anchor tag for opening/downloading in react-table since I couldn't access a specific cell in the code for table. So I had to take detour of using their useRowSelect and then connecting with download/delete button.   

## View it live

### Front-end
https://file-archive-prototyp-jihyun.netlify.app/
### Back-end
https://file-archive.herokuapp.com/files

