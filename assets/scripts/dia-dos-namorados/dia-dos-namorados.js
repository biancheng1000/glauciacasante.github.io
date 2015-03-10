$(function()
{
	AdjustHeight();
	RegisterEvents();
	GenerateOurPhotos(151);
	
	window.setTimeout("MoveOurBackgroundPhotos()", 7000);
	CallStartFrames();
	
	$("#assistirNovamente").bind("click", function(e)
	{
		e.preventDefault();
		$("#messagesContainer ul").animate({top: 500}, 5000);
		CallStartFrames();
		
		document.getElementById("music").play();
	});
});

function AdjustHeight()
{
	$("#opacity, #photos").css("height", $(window).height());
}

function RegisterEvents()
{
	$(window).bind("resize", function() {AdjustHeight(); });
}

function GenerateOurPhotos(photosCount)
{
	var ourPhoto = $(".our-photos:eq(0)");
	var createdPhoto = null;
	
	for (var i = 2; i <= photosCount; i++)
	{
		createdPhoto = ourPhoto.clone();
		createdPhoto.find("img").attr("src", "/assets/images/dia-dos-namorados/fotos/" + i + ".jpg");
		
		createdPhoto.css
		({
			top: GetRandom($(window).height()) - 100,
			left: GetRandom($(window).width()) - 100
		});
		
		ourPhoto.after(createdPhoto);
	}
	
	$("#photos").fadeIn(5000);
}

function GetRandom(base)
{
	var result = Math.floor(Math.random() * base);
	if (result <= 0)
		return GetRandom(base);
	
	return result;
}

var backgroundInterval;
function MoveOurBackgroundPhotos()
{
	$(".our-photos").each(function()
	{
		$(this).animate
		({
			top: GetRandom($(window).height()) - 100,
			left: GetRandom($(window).width()) - 100
		}, 30000);
	});
	
	backgroundInterval = window.setTimeout("MoveOurBackgroundPhotos()", 60000);
}

function CallStartFrames()
{
	window.setTimeout("StartFrames()", 30000);
}

var currentFrame = 0;
var framesInterval;
function StartFrames()
{
	var listFrames = $("#messagesContainer ul");
	var frames = listFrames.find(".frames");
	
	listFrames.animate
	({
		top: frames.eq(currentFrame).attr("position")
	}, 1000);
	
	currentFrame++;
	framesInterval = window.setInterval("ContinueFrames()", 10500);
}

function ContinueFrames()
{
	var listFrames = $("#messagesContainer ul");
	var frames = listFrames.find(".frames");
	
	if (currentFrame < frames.length)
	{
		listFrames.animate
		({
			top: frames.eq(currentFrame).attr("position")
		}, 1000);
		
		currentFrame++;
	}
	else
		window.clearInterval(framesInterval);
}