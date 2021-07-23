document.querySelector('.busca').addEventListener('submit', async (event) => {
    //evita a página de recarregar quando o input é enviado
    event.preventDefault();

    //recebe o valor recebido pelo input
    let input = document.querySelector('#searchInput').value;

    //valida de valor do input é válido
    if (input !== '') {
        clearInfo();
        showWarning('Carregando...')

        //carrega a API
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=29fc5ebc0ca7f89f1764861fcfbc00e6&units=metric&pt_br`;

        //transformas dados da API em json
        let results = await fetch(url);
        let json = await results.json();

        //verifica se o input existe no json
        if (json.cod === 200) {
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg,
            });
        } else {
            clearInfo();
            showWarning('City not found.');
        }
    } else {
        clearInfo();
    }

});

//mostrar informações da API
function showInfo(json) {
    //remove o alert
    showWarning('');

    //exibe box de informações
    document.querySelector('.resultado').style.display = 'block';

    //preenche informações
    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`;
    document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>ºC</sup>`;
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>km/h</span>`;
    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);
    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle-90}deg)`;

}

function clearInfo() {
    showWarning('');
    document.querySelector('.resultado').style.display = 'none';
}

//mostra mensagem de alert
function showWarning(msg) {
    document.querySelector('.aviso').innerHTML = msg;
}