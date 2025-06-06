let acero = document.getElementById('acero');
let agua = document.getElementById('agua');
let bicho = document.getElementById('bicho');
let dragon = document.getElementById('dragon');
let electrico = document.getElementById('electrico');
let fantasma = document.getElementById('fantasma');
let fuego = document.getElementById('fuego');
let hada = document.getElementById('hada');
let hielo = document.getElementById('hielo');
let lucha = document.getElementById('lucha');
let normal = document.getElementById('normal');
let planta = document.getElementById('planta');
let psiquico = document.getElementById('psiquico');
let roca = document.getElementById('roca');
let siniestro = document.getElementById('siniestro');
let tierra = document.getElementById('tierra');
let veneno = document.getElementById('veneno');
let volador = document.getElementById('volador');

let boton = document.getElementById('boton');
let mensaje = document.getElementById('mensaje');
let tarjetaPokemon = document.getElementById('tarjeta-pokemon');
let imagenPokemon = document.getElementById('imagen-pokemon');
let nombrePokemon = document.getElementById('nombre-pokemon');
let tiposPokemon = document.getElementById('tipos-pokemon');
let alturaPokemon = document.getElementById('altura-pokemon');
let pesoPokemon = document.getElementById('peso-pokemon');
let habilidadesPokemon = document.getElementById('habilidades-pokemon');


let coloresTipo = {
        steel: '#B8B8D0', water: '#6890F0', bug: '#A8B820', dragon: '#7038F8', electric: '#F8D030', ghost: '#705898',
        fire: '#F08030', fairy: '#EE99AC', ice: '#98D8D8', fighting: '#C03028', normal: '#A8A878', grass: '#78C850',
        psychic: '#F85888', rock: '#B8A038', dark: '#705848', ground: '#E0C068', poison: '#A040A0', flying: '#A890F0'
    };


    boton.addEventListener('click', generarPokemon);

    function generarPokemon() {
        let pokemons = document.getElementsByName('tipo');
            let tipoSeleccionado = '';

            // Buscar el tipo seleccionado
            for (let pokemon of pokemons) {
                if (pokemon.checked) {
                    tipoSeleccionado = pokemon.value;
                    break;
                }
            }

            if (!tipoSeleccionado) {
                mensaje.textContent = '¡Selecciona un tipo primero!';
                return;
            }

            tarjetaPokemon.style.display = 'none';

            fetch(`https://pokeapi.co/api/v2/type/${tipoSeleccionado}`)
                .then(respuestaT)
                .catch(error);
        }

    function respuestaT(respuestat) {
        return respuestat.json()
            .then(datos)
            .catch(error);
    }

        function datos(datos) {
            const listaPokemon = datos.pokemon;
            const pokemonAleatorio = listaPokemon[Math.floor(Math.random() * listaPokemon.length)].pokemon;
            return fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonAleatorio.name}`)
                .then(respuestaD)
                .catch(error);
        }

        function respuestaD(respuestad) {
            mensaje.style.display = 'none';
            return respuestad.json()
                .then(mostrarPokemon)
                .catch(error);
        }

        function mostrarPokemon(datosPokemon) {
            nombrePokemon.textContent = datosPokemon.name.charAt(0).toUpperCase() + datosPokemon.name.slice(1);
            
            if (datosPokemon.sprites.other?.['official-artwork']?.front_default) {
                imagenPokemon.src = datosPokemon.sprites.other['official-artwork'].front_default;
            } else {
                imagenPokemon.src = datosPokemon.sprites.front_default;
            }
            
            tiposPokemon.innerHTML = '';
            datosPokemon.types.forEach(tipos);

            function tipos(tipo) {
                const tipoElemento = document.createElement('span');
                tipoElemento.className = 'tipo';
                tipoElemento.textContent = tipo.type.name;
                tipoElemento.style.backgroundColor = coloresTipo[tipo.type.name];
                tiposPokemon.appendChild(tipoElemento);
            }
            
            alturaPokemon.textContent = (datosPokemon.height / 10) + ' m';
            pesoPokemon.textContent = (datosPokemon.weight / 10) + ' kg';
            
            habilidadesPokemon.innerHTML = '';
            datosPokemon.abilities.forEach(habilidad);

            function habilidad(habilidad) {
                const habilidadElemento = document.createElement('span');
                habilidadElemento.className = 'habilidad';
                habilidadElemento.textContent = habilidad.ability.name.replace('-', ' ');
                habilidadesPokemon.appendChild(habilidadElemento);
            }

            tarjetaPokemon.style.display = 'block';
        }

        function error(error){
            console.error('Error:', error);
            mensaje.textContent = 'Intenta de nuevo.';
        }