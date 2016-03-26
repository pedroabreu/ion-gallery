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
        src:'http://www.hdwallpapersimages.com/wp-content/uploads/2014/01/Winter-Tiger-Wild-Cat-Images.jpg',
        thumb:'http://www.gettyimages.co.uk/CMS/StaticContent/1391099215267_hero2.jpg'
      }
    ]

Thumbnail property is also optional. If no thumbnail, the source content will be used

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
                          row_size: 3,
                          fixed_row_size: true
  });
});
```

```
Default values
action_label - 'Close' (String)
toggle - false (Boolean)
row_size - 3 (Int)
fixed_row_size - true (boolean). If true, thumbnails in gallery will always be sized as if there are "row_size" number of images in a row (even if there aren't). If set to false, the row_size will be dynamic until it reaches the set row_size (Ex: if only 1 image it will be rendered in the entire row, if 2 images, both will be rendered in the entire row)
```

- Via markup:

Markup overrides provider definitions

- ion-gallery-row: Defines size of the row. Default to 3 images per row

          <ion-gallery ion-gallery-items="items" ion-gallery-row="5"></ion-gallery>

- ion-gallery-toggle: Sets one tap action on slideshow to hide/show subtitles and "Done" button. Default: true

          <ion-gallery ion-gallery-items="items" ion-gallery-toggle="false"></ion-gallery>

- ion-item-callback: Overrides the default action with a custom callback when an item is tapped. Default: opens the slider modal

          <ion-gallery ion-gallery-items="items" ion-item-callback="callback(item)"></ion-gallery>
