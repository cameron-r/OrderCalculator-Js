var Slides = {
    container : $('#slides'),

    totalSlides : '',

    translateAmount : 0,

    currentSlide : location.hash.split("-")[1],

    slideWidth : '',

    currentHash : location.hash,
    lastHash: '',

    init : function(totalSlides) {
        var each;

        if ( !totalSlides ) throw new Error('Please pass the total number of slides.');
        Slides.totalSlides = totalSlides;

        Slides.loadContent();

        $(Slides.currentHash).show();
        $(Slides.container).show();


        Slides.keyPress();
    },

    loadContent : function() {
        Slides.container.hide();
        for ( var i = 0; i < Slides.totalSlides; i++ ) {
            $('<div id="slide-' + i + '"></div>')
                .load('slides/' + i + '.html')
                .appendTo(Slides.container)
                .hide();
        }
    },

    keyPress : function() {
        $(document.body).keydown(function(e) {
            // if left or right arrow key is pressed
            if ( e.keyCode === 39 || e.keyCode === 37 ) {
                e.preventDefault();
                ( e.keyCode === 39 ) ? Slides.next() : Slides.prev();
            }
        });
    },

    next : function( ) {
        if (Slides.currentSlide + 1 === Slides.totalSlides) return;

        Slides.translateAmount -= Slides.slideWidth;
        Slides.updateHash( ++Slides.currentSlide );
        Slides.animate();
    },

    prev : function() {
        // No more left to go back.
        if ( Slides.currentSlide === 0 ) return;

        Slides.translateAmount += Slides.slideWidth;
        Slides.updateHash( --Slides.currentSlide );
        Slides.animate();
    },

    animate : function() {
        $(Slides.lastHash).hide();
        $(Slides.currentHash).show();
    },

    updateHash : function( slideNumber ) {
        Slides.lastHash = Slides.currentHash;
        Slides.currentHash = "#slide-" + slideNumber;
        location.hash = Slides.currentHash;
    }
};

Slides.init(5);