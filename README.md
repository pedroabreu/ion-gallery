# ion-gallery
Ionic gallery with slider

Demo availabe in Ionic View with id 150745FE

    $ bower install --save ion-gallery

# Features

 - Define number of collums to present (1 to array length)
 - Pinch and double tap do zoom on picture

# Usage

Load script and css on the html

    <link href="lib/ion-gallery/dist/ion-gallery.css" rel="stylesheet">
    ...
    <script src="lib/ion-gallery/dist/ion-gallery.min.js"></script>

Add ion-gallery as dependency to your project

    angular
     .module('starter', ['ionic','ion-gallery'])

Add gallery directive with array of photos:

    <ion-gallery ion-gallery-items="items"></ion-gallery>

Data source example

    $scope.items = [
      {
        src:'http://www.wired.com/images_blogs/rawfile/2013/11/offset_WaterHouseMarineImages_62652-2-660x440.jpg',
        sub: 'This is a <b>subtitle</b>'
      },
      {
        src:'http://www.gettyimages.co.uk/CMS/StaticContent/1391099215267_hero2.jpg',
        sub: '' /* Not showed */
      },
      {
        src:'http://www.hdwallpapersimages.com/wp-content/uploads/2014/01/Winter-Tiger-Wild-Cat-Images.jpg'
      }
    ]

Subtitle property is optional. If no property present, nothing is showed (Same for empty string).
Supports html tags.

UI will reflect changes on the content object passed to the directive. Example of adding and removing pictures can be seen in the ionic view app.

# Config

- Via provider:

Default values in example. 

```
app.config(function(ionGalleryConfigProvider) {
  ionGalleryConfigProvider.setGalleryConfig({
                          action_label: 'Close',
                          toggle: false,
                          row_size: 3
  });
});
```

```
Default values
action_label - 'Close' (String)
toggle - false (Boolean)
row_zie - 3 (Int)
```

- Via markup:

Markup overrides provider definitions

- ion-gallery-row: Defines number of collums to display. Default 3

          <ion-gallery ion-gallery-items="items" ion-gallery-row="5"></ion-gallery>

- ion-gallery-toggle: Sets one tap action on slideshow to hide/show subtitles and "Done" button. Default: true

          <ion-gallery ion-gallery-items="items" ion-gallery-toggle="false"></ion-gallery>
