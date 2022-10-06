import { Map as mapGl} from 'maplibre-gl';
import places from 'assets/places.json'
import light from 'assets/styles/gv-light.json'
import dark from 'assets/styles/gv-dark.json'

//Depending on the screen resolution of the user we can use two different sets of symbols
const pixelRatio = window.devicePixelRatio;

const spriteURL = pixelRatio <= 1
?

"https://interactive.guim.co.uk/maptiles/ukraine-100-days/sprites/sprite%402x"
:

"https://interactive.guim.co.uk/maptiles/ukraine-100-days/sprites/sprite"

//Adding sprites to default styles
light.sprite = spriteURL;
dark.sprite = spriteURL;

//adding labels objects to default styles

light.sources.places = {
	'type': 'geojson',
	'data': places
}

dark.sources.places = {
	'type': 'geojson',
	'data': places
}

//adding labels appearance to default styles

light.layers.push({
	'id': 'labels',
	'type': 'symbol',
	'source': 'places',
	"layout": {
				"text-size": 22,
				"text-font": ["Gdn Text Sans TS3Bold"],
				"text-field": "{name}",
				"text-anchor": "top",
				"text-justify": "center",
				"text-radial-offset": 1,
				"icon-image": "Populated place"
			},
	"paint": {
				"text-halo-color": "#FFFFFF",
				"text-halo-width": 1,
				"text-color": "#333333"
			}
})

dark.layers.push({
	'id': 'labels',
	'type': 'symbol',
	'source': 'places',
	"layout": {
				"text-size": 22,
				"text-font": ["Gdn Text Sans TS3Bold"],
				"text-field": "{name}",
				"text-anchor": "top",
				"text-justify": "center",
				"text-radial-offset": 1,
				"icon-image": "Populated place"
			},
	"paint": {
				"text-halo-color": "#FFFFFF",
				"text-halo-width": 1,
				"text-color": "#333333"
			}
})


//Give size to the map container

const atomEl = document.getElementById('gv-wrapper');

const height = window.innerHeight;

atomEl.style.height = height + "px";

//Map initialization

let map = new mapGl({
	container: 'gv-wrapper', // container id
	style:dark,
	center: [-0.1015987,51.5286416],
	minZoom: 0,
	maxZoom: 22,
	zoom:4,
	interactivity:false
});

//Map behaviours

map.on('zoom', ()=>{

		if(map.getZoom() > 6){
			map.setStyle(light)
		}
		else map.setStyle(dark)

})

