$(document).ready(function(){
  // Add smooth scrolling to all links
  $("a").on('click', function(event) {

    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 300, function(){

        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    } // End if
  });
});

// $(document).on('scroll', function(){
  
// //    the scrollTop method gives us back a pixel value for how far it is from the top of the page (our current scroll position)
//   var pixelsFromTop = $(document).scrollTop()
  
//     if (pixelsFromTop < 1000){
//     $('body').css('background-color', '#4062a6')
//   } 
//     else {
//           $('body').css('background-color', '#3f6125')
//           $('body').addClass('downBG');
//   };
//   });