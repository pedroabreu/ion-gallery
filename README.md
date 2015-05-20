# ion-gallery
Ionic gallery with slider

[SS1](http://i.imgur.com/0TbxQkH.png)
[SS2](http://i.imgur.com/n9XTXZB.png)

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


