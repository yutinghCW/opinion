function copyToClipboard(text) {
	if (window.clipboardData && window.clipboardData.setData) {
		// IE specific code path to prevent textarea being shown while dialog is visible.
		return clipboardData.setData("Text", text);
	} else if (
		document.queryCommandSupported &&
		document.queryCommandSupported("copy")
	) {
		var textarea = document.createElement("textarea");
		textarea.textContent = text;
		textarea.style.position = "fixed"; // Prevent scrolling to bottom of page in MS Edge.
		document.body.appendChild(textarea);
		textarea.select();
		try {
			return document.execCommand("copy"); // Security exception may be thrown by some browsers.
		} catch (ex) {
			console.warn("Copy to clipboard failed.", ex);
			return false;
		} finally {
			document.body.removeChild(textarea);
		}
    }
}
function toggleMsg() {
    $('#cpoySuccess').fadeIn();
    setTimeout(function(){
        $('#cpoySuccess').fadeOut();
    }, 3000);
}

$(document).on('lazyloaded', function(e){
    $(".lazy-item").each(function() {
        $(this).addClass('finished');
    });
});

$(function() {
    var width = $(window).width();
    //倒數計時
    var settimmer = 0;
    window.setInterval(function() {
        var timeCounter = $("span[id=show-time]").html();
        var updateTime = eval(timeCounter) - eval(1);
        $("span[id=show-time]").html(updateTime);
        if (updateTime == 0) {
            $("div[id=my-timer]").html("").html("前往獨立評論首頁");
            window.location = ("/");
        }
    }, 1000);
    $('.menu > li > a').click(function() {
        $(this).parent('li').siblings('li').children('a').children('i.fa').removeClass('fa-caret-up').addClass('fa-caret-down');
        $(this).parent('li').siblings('li').children('ul').slideUp();
        $(this).children('i.fa').toggleClass('fa-caret-down fa-caret-up');
        $(this).siblings('ul').slideToggle();
    })
    $('.hamburger').click(function() {
        $('body').addClass('opened');
        $('nav').slideDown();
    })
    $('nav .close').click(function() {
        $('body').removeClass('opened');
        $('nav').slideUp();
    });
    //slider
    var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        paginationClickable: true,
        spaceBetween: 0,
        centeredSlides: true,
        loop: true,
        autoplay: 5500,
        autoplayDisableOnInteraction: false
    });
    // $('.socialBTN').each(function() {
    //     var social = $(this).outerWidth(),
    //         ulWidth = $(this).children('ul').outerWidth();
    //     if (width >= 1024) {
    //         $(this).children('.fb-like-iframe').css({
    //             'width': social - ulWidth - 3
    //         });
    //     }
    // });
    $('.author .author-txt').each(function() {
        var txt = '',
            length = $(this).children().length;
        if (length > 0) {
            for (var i = 0; i < length; i++) {
                txt += $(this).children().eq(i).html();
            }
            $(this).html(txt);
        }
    })
    $("#more").click(function() {
        $("#item" + $(this).attr("id2")).show();
        $("#more").show();
        var next_id = parseInt($(this).attr("id2")) + 1;
        if ($("#item" + next_id).css('display') != 'none') {
            $("#more").hide();
        } else {
            $("#more").attr({
                id2: next_id
            });
        }
        return false;
    });
    $(window).on('load', function() {
        var headerHeight = $("header").outerHeight(),
            headerMenuHeight = $("header .menu").outerHeight();
        $('body').css('padding-top', headerHeight);
        $(window).resize(function() {
            var headerHeight = $("header").outerHeight();
            $('body').css('padding-top', headerHeight);
        });
        $(window).scroll(function() {
            var scroll = $(window).scrollTop(),
                articleTitle = $(".article-page .article-title .title"),
                articleTitleTop = articleTitle.offset().top;
            $('.fixed-top').css('top', headerHeight - headerMenuHeight);
            $('body').css('padding-top', headerHeight);
            if ((scroll > headerHeight) && (width >= 1024)) {
                $("header").addClass('scroll');
                $(".menu").hide();
            } else {
                $("header").removeClass('scroll');
                $(".menu").show();
            }
            if ((scroll > articleTitleTop)) {
                $(".socialBTN").addClass('show');
                // console.log('a');
            } else {
                $(".socialBTN").removeClass('show');
                // console.log('n');
            }
        });
    });
})