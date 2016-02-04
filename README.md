# MagicMirror-Buses
This is a module for the Magic Mirror project for Raspberry Pi seen here: https://github.com/MichMich/MagicMirror
##Introduction

I wanted to make my Magic Mirror show the live updated bus information for my particular bus stop so I knew when to leave the house.
For this I made a YQL request to the Brighton Buses website to collect the bus information as a JSON file. 
I then use this to make an array containing the bus number, destination and time until arrival.
This then is then appropriately ordered into a table which is shown on the Magic Mirror.

##Configuation:

###[main.js](brightonBuses/main.js)
'busStop: xxxx,' must be changed to configure the bus stop you wish to view. To find the appropriate bus stop I would recommend viewing remy's list of all Brighton Bus stops here: https://github.com/remy/brighton-buses/blob/master/data/all_stops.kml and finding the 4 digit code for your bus stop.

`busStopName:"xxxxxxxxxxx",`should be changed to display your bus stop name.

`busesShown: x,` may be changed to show more/less buses on the mirror.

`refreshPeriod: xxxxx,` refresh period in ms for the bus info, too regular might piss off Brighton busses or Yahoo. Mine is 30000.

`noBusesMessage: "xxxxxxxxxxxxxx",` text to display if there are no buses on the schedule.

###[style.css](brightonBuses/style.css)

Change however you want the style to be.
