$(document).ready(function(){
	var x = "x";
	var o = "o";
	var turns = 0;
	// Spot vars
	var spot1 = $('#spot1');
	var spot2 = $('#spot2');
	var spot3 = $('#spot3');
	var spot4 = $('#spot4');
	var spot5 = $('#spot5');
	var spot6 = $('#spot6');
	var spot7 = $('#spot7');
	var spot8 = $('#spot8');
	var spot9 = $('#spot9');
	
	$('#board li').on('click', function(){
		if(checkWin('o')){
			alert('Winner: O');
			$('#board li').text('');
			$('#board li').removeClass('disable');
			$('#board li').removeClass('o');
			$('#board li').removeClass('x');
		} else if(checkWin('x')){
			alert('Winner: X');
			$('#board li').text('');
			$('#board li').removeClass('disable');
			$('#board li').removeClass('o');
			$('#board li').removeClass('x');
		} else if(turns == 9){
			alert('Tie Game');
			$('#board li').text('');
			$('#board li').removeClass('disable');
			$('#board li').removeClass('o');
			$('#board li').removeClass('x');
			turns = 0;
		} else if($(this).hasClass('disable')){
			alert('This spot is already filled');
		} else if(turns%2 == 0){
			turns++;
			$(this).text(o);
			$(this).addClass('disable o');
			if(checkWin('o')){
				alert('Winner: O');
				turns = 0;
			}
		} else {
			turns++;
			$(this).text(x);
			$(this).addClass('disable x');
			if(checkWin('x')){
				alert('Winner: X');
				turns = 0;
			}
		}
	});

	function checkWin(xo) {
		if(spot1.hasClass(xo) && spot2.hasClass(xo) && spot3.hasClass(xo) ||
			spot4.hasClass(xo) && spot5.hasClass(xo) && spot6.hasClass(xo) ||
			spot7.hasClass(xo) && spot8.hasClass(xo) && spot9.hasClass(xo) ||
			spot1.hasClass(xo) && spot4.hasClass(xo) && spot7.hasClass(xo) ||
			spot2.hasClass(xo) && spot5.hasClass(xo) && spot8.hasClass(xo) ||
			spot3.hasClass(xo) && spot6.hasClass(xo) && spot9.hasClass(xo) ||
			spot1.hasClass(xo) && spot5.hasClass(xo) && spot9.hasClass(xo) ||
			spot3.hasClass(xo) && spot5.hasClass(xo) && spot7.hasClass(xo)
		){
			return true;
		}else{
			return false;
		}
	}

	// Reset Handler
	$("#reset").click(function(){
		$("#board li").text("");
		$("#board li").removeClass('disable');
		$("#board li").removeClass('o');
		$("#board li").removeClass('x');
		turns = 0;
	});
});