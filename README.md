# London Crime Trends Dashboard
Retrieve street crime statistics for each of the London tube stops
and visualise the data extracted for the selected stop. The colour scheme is based
on TFL (Transport for London) colours for each line. This was developed as a single-page application which can be viewed at: [julian-garcia.github.io/london-crime-trends/](https://julian-garcia.github.io/london-crime-trends/)

## Features
**Dynamic Content** - All content is dynamic as the TFL tube lines and stations are retrieved using the TFL API.

**Interactive** - The user can select a tube line and a stop within the selected tube line to retrieve street crime statistics.

**Responsive** - Scales up or down according to the device being used to view the site.

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

## Testing
To ensure HTML standards are adhered to, the single html page was fed in to the W3C validator and corrected accordingly. To test for site responsiveness, browser responsive mode was used to render the site simulating various screen widths. Tested across various browsers including: Safari, Firefox, Chrome and IE. Also tested on an Apple iPhone SE.

## Credits
These public APIs were used to populate various UI elements and charts
- [api.tfl.gov.uk](https://api.tfl.gov.uk)
- [data.police.uk](https://data.police.uk)
