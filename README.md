# London Crime Trends Dashboard
The purpose of this single page web application is to enable users to check London crime rates local to London Underground train stations. It retrieves street crime statistics within a 1 mile radius of each of the London Underground tube stops using the Police UK API and visualises the crime data extracted for the selected stop using DC (dimensional charting JavaScript framework). The location of each station is highlighted using the Google maps API and the TFL API is used to retrieve tube line stops and their exact locations. The website can be viewed here: [julian-garcia.github.io/london-crime-trends/](https://julian-garcia.github.io/london-crime-trends/)

## Features
**Dynamic Content** - All content is dynamic as the TFL tube lines and stations are retrieved using the TFL API. The user can select a tube line and a stop within the selected tube line to retrieve street crime statistics local to that stop. 

**Interactive** - All graphs and dropdowns auto adjust if one or more sections of the crime locations pie chart are selected. The user can also drag the pointer over the line chart to reduce the data down to a smaller date range.

**Responsive** - Content scales up or down according to the device being used to view the site.

## Site Design
The colour scheme was determined by matching the tube line colours used by Transport for London. People will be familiar and accustomed to that colour scheme in relation to london underground stations. As this website is based on those stations, it seems appropriate to accommodate the existing colour scheme. 

Current state is highlighted at all times using highlighting - the side bar menu item background is highlighted upon user click. Furthermore the mobile menu is kept in line with the side bar - so selecting Northern line will highlight both the side bar menu item and the mobile menu item. 

### Typography
For headings and buttons the Google Font: "Tajawal" was used - this is similar to the font used by the Transport for London site. In this way, this site retains familiarity with the typeface used by Transport for London. All buttons/links use a dark background with white text to avoid insufficient contrast between the text and background.

## Languages, Libraries and Frameworks
- ### Front End Development
- HTML5, CSS3
  - Core languages used to build the site
- Javascript
  - Used to facilitate graph rendering using D3/DC and crossfilter
- jQuery v3.3.1
  - A dynamic user interface was implemented using jQuery, as well as API queries
- SASS
  - Used for styling the web page. SASS code has been structured as advised by [thesassway.com](http://www.thesassway.com)
- ### Data Visualisation Libraries
- [D3 v5](https://d3js.org) (Data driven documents)
- [DC v3.0.4](https://dc-js.github.io/dc.js/) (Dimensional charting)
  - Build and render the charts
- [crossfilter v1.3.12](https://github.com/crossfilter/crossfilter/wiki)
  - Apply dynamic filters to dynamically adjust charts according to user selection
- ### Frameworks
- [Bootstrap v4.1.1](http://getbootstrap.com)
- [Bootswatch Flatly](https://bootswatch.com/flatly/)
  - Bootstrap based predefined theme
- [Fontawesome v5.0.13](https://fontawesome.com)
- [Google Fonts](https://fonts.google.com)
  - Title and body fonts (Tajawal and Bellefair)
- [Jasmine v3.3.0](https://jasmine.github.io)
  - JavaScript testing framework to verify the JavaScript functionality employed by this website

## Testing
To ensure HTML standards are adhered to, the site URL was fed in to the [W3C validator](https://validator.w3.org/nu/?doc=https%3A%2F%2Fjulian-garcia.github.io%2Flondon-crime-trends%2F) and corrected accordingly to remove all errors. To test for site responsiveness, browser responsive mode was used to render the site simulating various screen widths. Tested across various browsers including: Safari, Firefox, Chrome and Internet Explorer. Cross browser compatibility can be confirmed by visiting [browsershots.org](http://browsershots.org/https://julian-garcia.github.io/london-crime-trends/) and feeding in the URL `https://julian-garcia.github.io/london-crime-trends/`. Device wise, visual checks were performed on an Apple iPhone SE and Apple Macbook Pro.

### Jasmine
Various tests have been implemented using the Jasmine testing framework:
- Confirm correct Police UK API request URLs
- Confirm correct TFL API request URLs
- Check that derived crime data has expected values 
A [screenshot of the test results](resources/Jasmine%20Test%20Results.png) is available and 
all the source code used for the tests is in the [Jasmine directory](jasmine/).

### User Interaction Testing
Verify that the layout adjusts correctly according to viewport size. Also that elements respond visually as expected to user clicks and hovers. Test details and results are available in [UI Tests.csv](resources/UI%20Tests.csv).

### Browser Console Testing
The purpose of this test is to confirm that all JavaScript runs successfully without errors and that API calls return the expected crime/tfl/gmaps data. An http archive file showing the browser console results is available [test.index.html.har](resources/test.index.html.har). The best way to view the file is to download it and use the [toolbox.googleapps.com HAR analyser](https://toolbox.googleapps.com/apps/har_analyzer/).

## Deployment & Contributions
The site was deployed using the [Github Pages](https://pages.github.com) feature of Github which provides a server side address hosed by GitHub in order to render a static website. To contribute to this you'll need to do the following:
- create your own Github repository on GitHub
- create a local project directory on your PC, 
- navigate to that directory on the command line (for command line I use [iTerm2](https://www.iterm2.com) on my mac), 
- clone this github repository by entering: `git clone https://github.com/julian-garcia/london-crime-trends.git`. 
Then use any text editor to make your changes to the Javascript and/or HTML. To test, simply open index.html locally in any web browser. Having finished development and testing:
- Navigate to your project directory on the command line and enter `git add .` 
- Enter `git commit -m 'My changes'` - replace 'my changes' with a brief overview of your changes
- Finally deploy using `git push -u origin master`
- To set up the static website, go to the settings of your github repository and select "master branch" from the source dropdown in the Github pages section

## Credits
These public APIs were used to populate various UI elements and charts
- [api.tfl.gov.uk](https://api.tfl.gov.uk)
- [data.police.uk](https://data.police.uk)
- [maps.googleapis.com](https://maps.googleapis.com/maps/api)
