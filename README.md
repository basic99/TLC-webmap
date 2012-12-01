#TLC-webmap

Triangle Land Conservancy web map application and web map page using Google Fusion Tables and GeoJSON.js

#Notes

##Mapping Application

The web map application on page tlcapp.html is self-contained and requires no server setup or configuration.
For production, possibly copy tlcapp.html to index.html. The vector data is loaded from geojson data files in
the data directory, and the raster maps use Google Fusion Tables and are handled by Google servers.

##Mapping web page

To add this map on a web page all you need is to include google.css and tlcweb.js from this site and the Google maps
API and jQuery from the web. Add a div:

<div id="map" style="width: 500px;height: 500px; border: solid black 1px;"></div>

Also add a bit of code to for a layer switcher and you're done. See a minimal example in tlcweb.html.