function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
}

function detectCirclesCollision(obiect1, object2) {
    var dx = obiect1.x - object2.x;
    var dy = obiect1.y - object2.y;
    var distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < obiect1.radius + object2.radius) {
        return true;
    }
    return false;
}