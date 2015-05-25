# ion-gallery
Ionic gallery with slider

Demo availabe in Ionic View with id FA3E66F6

    $ bower install --save ion-gallery

# Usage

Load script and css on the html

    <link href="lib/ion-gallery/dist/ion-gallery.css" rel="stylesheet">
    ...
    <script src="lib/ion-gallery/dist/ion.gallery.min.js"></script>

Add ion-gallery as dependency to your project

    angular
     .module('starter', ['ionic','ion-gallery'])

Add gallery directive with array of photos:

    <ion-gallery ion-gallery-items="items"></ion-galllery>

Data source example

    $scope.items = [
      {
        src:'http://www.wired.com/images_blogs/rawfile/2013/11/offset_WaterHouseMarineImages_62652-2-660x440.jpg'
      },
      {
        src:'http://www.gettyimages.co.uk/CMS/StaticContent/1391099215267_hero2.jpg'
      },
      {
        src:'http://www.hdwallpapersimages.com/wp-content/uploads/2014/01/Winter-Tiger-Wild-Cat-Images.jpg'
      }
    ]

# Config

- ion-gallery-row: Defines number of collums to display. Default 3

          <ion-gallery ion-gallery-items="items" ion-gallery-row="5"></ion-galllery>


