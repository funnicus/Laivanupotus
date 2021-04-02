import { Link } from "react-router-dom";

/*
 * React-component for the Help-page
 */
const Help = () => {
  return (
    <div id="help-div">
      <Link to="/">
        <button title="Takaisin" className="back-button">
          <img src="./icons/arrow-left.svg" />
        </button>
      </Link>
      <h1 className="title">Ohjeet</h1>
      <h2 className="sub-title">Mikä on laivanupotus?</h2>
      <p className="help-text">
        Laivanupotus on kahden pelaajan peli, jossa molemmilla pelaajilla on oma
        peliruudukko, jolle he asettavat laivansa. Laivoja on eri pituisia, ja
        niitä voi olla eri määrä pelistä riippuen. Pelaajat eivät näe toistensa
        laivoja. Pelaajat ampuvat vuorotellen toistensa laudoille valitsemalla
        ruudun, johon he haluavat ampua. Pelaaja saa uuden vuoron, jos hän osuu
        vastustajansa laivaan. Laiva uppoaa, kun sen jokaiseen ruutuun on
        osuttu. Peli loppuu, kun jomman kumman pelaajan kaikki laivat ovat
        uponneet. Pelin voittaa siis se pelaaja, joka saa upotettua kaikki
        vastustajansa laivat ensimmäisenä.
      </p>
      <h2 className="sub-title">Miten voin pelata laivanupotusta?</h2>
      <p className="help-text">
        Voit aloittaa pelin painamalla "Aloita peli"-nappia{" "}
        <Link to="/">
          <a id="body-link">kotisivulla</a>
        </Link>
        . Ensimmäiseksi pelille valitaan asetukset, eli pelaajien nimet,
        pelilaudan koko ja eri alustyyppien määrät. Kun olet tyytyväinen pelin
        asetuksiin, voit siirtyä asettamaan laivoja paikoilleen painamalla
        "Vahvista asetukset"-nappia.
      </p>
      <br></br>
      <p className="help-text">
        Laivat asetetaan vuorotellen; ensin pelaajalle 1, sitten pelaajalle 2.
        Kun pelaaja asettaa laivojaan, ei toinen pelaaja saa nähdä ruutua.
        Laivat asetetaan paikoilleen vetämällä ne haluttuun kohtaan
        pelilaudalla. Laivoja voi kääntää ennen siirtoa painamalla r-näppäintä.
        Laivat eivät saa olla vierekkäisissä ruuduissa. Nämä ns. kielletty
        ruudut on merkitty punaisella, etkä voi asettaa laivoja siten, että ne
        ovat kyseisillä ruuduilla. Kun pelaaja 1 on asettanut laivat
        mieleisilleen paikoille, hän voi antaa vuoron seuraavalle pelaajalle
        painamalla "Vahvista laivojen sijainti!"-nappia.
      </p>
      <br></br>
      <p className="help-text">
        Kun kumpikin pelaaja on asettanut laivansa, itse peli alkaa. Vuoro alkaa
        aina painamalla "Aloita vuoro"-nappia. (Toinen pelaaja ei saa nähä
        tietokoneruutua toisen pelaajan vuorolla!) Jokaisella vuorolla pelaaja
        näkee sekä oman että vastustajan pelilaudan. Pelaajan tulee ampua
        vastustajan laudalle klikkaamalla sitä ruutua, johon haluaa ampua. Jos
        pelaaja osuu vastustajan laivaan, merkitään se ruudulle punaisella
        ruksilla, ja pelaaja saa uuden vuoron. Jos pelaaja upottaa vastustajan
        laivan, laiva tulee näkyviin ruudulle ja pelaaja saa uuden vuoron. Vuoro
        vaihtuu, kun pelaaja tekee hutiammunnan. Huti näkyy pelilaudalla
        valkoisena ruksina.
      </p>
      <br></br>
      <p className="help-text">
        Peli päättyy, kun toisen pelaajan kaikki laivat ovat uponneet. Voittaja
        julistetaan, ja voit aloittaa uuden pelin painamalla "Pelaa
        uudestaan!"-nappia, tai lopettaa pelaamisen painamalla "Lopeta
        pelaaminen"-nappia.
      </p>
    </div>
  );
};

export default Help;
