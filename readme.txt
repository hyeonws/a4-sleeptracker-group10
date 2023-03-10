--Readme document for Hyeon Woo Seo & Orviel Alzate, hyeonws@uci.edu & oalzate@uci.edu, 64575239 & 57964493--

1. How many assignment points do you believe you completed (replace the *'s with your numbers)?

17/20
- 3/3 The ability to log overnight sleep
- 3/3 The ability to log sleepiness during the day
- 3/3 The ability to view these two categories of logged data
- 0/3 Either using a native device resource or backing up logged data
- 3/3 Following good principles of mobile design
- 3/3 Creating a compelling app
- 2/2 A readme and demo video which explains how these features were implemented and their design rationale


2. How long, in hours, did it take you to complete this assignment?

36


3. What online resources did you consult when completing this assignment? (list specific URLs)

https://ionicframework.com/docs/api/datetime
https://ionicframework.com/docs/api/modal
https://ionicframework.com/docs/api/card
https://ionicframework.com/docs/api/button
https://ionicframework.com/docs/api/content
https://ionicframework.com/docs/api/grid
https://ionicframework.com/docs/api/tabs#usage
https://ionicframework.com/docs/api/range
https://stackoverflow.com/questions/49699067/property-has-no-initializer-and-is-not-definitely-assigned-in-the-construc
https://stackoverflow.com/questions/57079323/ion-tabs-scrolling-inside-ion-card-element-instead-of-being-fixed-to-bottom-io


4. What classmates or other individuals did you consult as part of this assignment? What did you discuss?

None


5. Is there anything special we need to know in order to run your code?

None


--Aim for no more than two sentences for each of the following questions.--


6. Did you design your app with a particular type of user in mind? If so, whom?

We designed our app with college students in mind, who were more likely to get on the app and log once a day.
We also felt that the minimalistic theme and dark mode also cater to this type of user.


7. Did you design your app specifically for iOS or Android, or both?

We designed our app specifically for iOS, as both of us primarily use iPhones and were unsure of what Android interface should look like.


8. How can a person log overnight sleep in your app? Why did you choose to support logging overnight sleep in this way?

A person can log overnight sleep by clicking the "Add Log" button on the corresponding card in the home page. 
This will take them to a new "page", where they can specify what day and what time they went to bed.
We thought that this was the most intuitive way to add a log with the layout of our app, and it would be easier for most people to use a picker wheel rather than using manual input.


9. How can a person log sleepiness during the day in your app? Why did you choose to support logging sleepiness in this way?

Same as above, a person can log sleepiness by clicking the "Add Log" button on the corresponding card in the home page.
The difference for this is that the "page" that opens includes a slider, which displays numbers, with the numbers and their meanings displayed below the slider.
We thought that this was a good way to show the information and a slider was the most intuitive way to display the scale.


10. How can a person view the data they logged in your app? Why did you choose to support viewing logged data in this way?

A person can view the data they logged by clicking the "All Logs" tab at the bottom.
We thought that it made more sense to show the logs all together, with them being color-coded so that it was easy to discern between the two types of data.


11. Which feature choose--using a native device resource, backing up logged data, or both?

We tried to do backing up logged data, but it didn't work and we couldn't figure it out so we unfortunately scrapped it.


12. If you used a native device resource, what feature did you add? How does this feature change the app's experience for a user?

N/A


13. If you backed up logged data, where does it back up to?

N/A


14. How does your app implement or follow principles of good mobile design?

Our app has a very simplistic yet useful initial view that shows the user everything they need and can interact with.
When submitting a log, the user has an "uh-oh" button in the form of being able to undo their action. And just in case that action was also an accident, there is one more option to redo that undo.
Error prevention is included by having picker wheels and sliders instead of manual input for the logs, as well as having proper error checks for proper dates and times.
There is no app-specific navigation and the words and icons are all intuitive to the actions being performed.
