//Saves the game data
function saveGame (userid, gamePath, imtime, imcost, imqual) {	
	$.get('Event', {userid : userid, gamePath : gamePath, imtime : imtime, imcost : imcost, imqual : imqual, type : 'saveGame'}, function(data){
		//console.log('SaveGame> userid: ' + userid + '; gamePath: ' + gamePath + '; Time: ' + imtime + '; Cost: ' + imcost + '; Quality: ' + imqual);
	});	
}