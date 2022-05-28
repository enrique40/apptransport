export default function getDistancia(latitudeEst, longitudeEst, latitudeChof, longitudeChf) {

	rad = function (x) {
         return x * Math.PI / 180;
     }
 
     //var R = 6378.137;//Radio de la tierra en km
     var R = 6371;
     var dLat = rad(latitudeChof - latitudeEst);
     var dLong = rad(latitudeChof - longitudeEst);
     var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(rad(latitudeEst)) * Math.cos(rad(latitudeChof)) * Math.sin(dLong / 2) * Math.sin(dLong / 2);
     var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
     var d = R * c;
     return d.toFixed(3);//Retorna tres decimales
	
	//var dLat = rad(latitudeEst - longitudeEst);

}

