import { useState } from "react";
import "./Settings.css";

/**
 * Settings-komponentti kuvaa pelin vaihetta, jossa pelaajilta kysytään nimet, pelilaudan koko ja alusten määrät
 * @param {Object} props
 * @returns Settings-elementin, jossa pelaajilta kysytään edellämainittuja tietoja
 */
const Settings = ({ game }) => {
  /*
   * Muuttujat pelaajaien nimille, laudan koolle ja alusten määrille.
   * Muuttujat kuvaavat kyseisiä arvoja pelissä, eivät Settings-komponentissa
   */
  const {
    player1Name: player1NameGame,
    player2Name: player2NameGame,
    boards,
    shipAmounts: initialShipAmounts,
  } = game.G;
  const gridSizeGame = boards[0].length;

  /*
   * Settings-komponentin input-fieldeissä olevat arvot ja funktiot niiden muuttamiselle
   */
  const [player1Name, setPlayer1Name] = useState(player1NameGame);
  const [player2Name, setPlayer2Name] = useState(player2NameGame);
  const [gridSize, setGridSize] = useState(gridSizeGame);
  const [carriers, setCarriers] = useState(initialShipAmounts.carriers);
  const [battleships, setBattleships] = useState(
    initialShipAmounts.battleships
  );
  const [cruisers, setCruisers] = useState(initialShipAmounts.cruisers);
  const [submarines, setSubmarines] = useState(initialShipAmounts.submarines);
  const [destroyers, setDestroyers] = useState(initialShipAmounts.destroyers);

  /*
   * Error-viestin arvo ja funktio sen muuttamiselle
   * Error-viesti näkyy käyttöliittymässä, jos pelilaudan koko tai alusten määrä ei kelpaa
   */
  const [error, setError] = useState("");

  /*
   * Objekti, joka sisältää kaikkien alusten määrät
   */
  const shipAmounts = {
    carriers,
    battleships,
    cruisers,
    submarines,
    destroyers,
  };

  /**
   * Funktio, joka tarkistaa, ovatko alusten arvot sopivat.
   * Sopivat alusten arvot täyttävät seuraavat kriteerit
   * 1) Alusten yhteenlaskettu pinta-ala on enintään puolet pelilaudan pinta-alasta
   * 2) Minkään aluksen määrä ei ole negatiivinen
   * @param {String} type aluksen, jonka arvoa muutetaan, tyyppi
   * @param {Number} amount aluksen uusi määrä
   * @returns false, jos kriteerit eivät täyty; true, jos kriteerit täyttyvät
   */
  const checkShipAmount = (type, amount) => {
    const amounts = { ...shipAmounts, [type]: amount };
    console.log(shipAmounts);
    console.log(
      amounts.carriers * 5 +
        amounts.battleships * 4 +
        amounts.cruisers * 3 +
        amounts.submarines * 3 +
        amounts.destroyers * 2
    );

    if (
      amounts.carriers * 5 +
        amounts.battleships * 4 +
        amounts.cruisers * 3 +
        amounts.submarines * 3 +
        amounts.destroyers * 2 >
      (gridSize * gridSize) / 2
    ) {
      setError(
        "Et voi lisätä enempää laivoja ellet suurenna pelilaudan kokoa tai poista joitakin laivoja"
      );
      return false;
    }

    if (
      amounts.carriers < 0 ||
      amounts.battleships < 0 ||
      amounts.cruisers < 0 ||
      amounts.submarines < 0 ||
      amounts.destroyers < 0
    )
      return false;

    setError("");
    return true;
  };

  /**
   * Funktio, joka tarkistaa, onko pelilaudan koko sopiva.
   * Sopiva pelilaudan koko täyttää seuraavat kriteerit
   * 1) Alusten yhteenlaskettu pinta-ala on enintään puolet pelilaudan pinta-alasta
   * 2) Pelilaudan koko on vähintään 5 ja enintään 10
   * @param {Number} gridSize
   * @returns false, jos kriteerit eivät täyty; true, jos kriteerit täyttyvät
   */
  const checkGridSize = (gridSize) => {
    console.log(gridSize);
    if (
      shipAmounts.carriers * 5 +
        shipAmounts.battleships * 4 +
        shipAmounts.cruisers * 3 +
        shipAmounts.submarines * 3 +
        shipAmounts.destroyers * 2 >
      (gridSize * gridSize) / 2
    ) {
      setError(
        "Et voi pienentää pelilaudan kokoa, ellet poista joitakin laivoja"
      );
      return false;
    }
    if (gridSize < 5 || gridSize > 10) {
      setError("Pelilaudan koon on oltava väliltä 5-10");
      return false;
    }
    setError("");
    return true;
  };

  /**
   * Funktiot pelilaudan koon ja eri alustyyppien arvojen päivittämiseen käyttöliittymässä.
   * Kutsuu checkGridSize-funktiota argumenttina uusi syötetty arvo, tai
   * Kutsuu checkShipAmount-funktiota argumenteilla aluksen tyyppi ja syötetty uusi arvo.
   * Jos check-funktio palauttaa arvon true, päivitetään käyttöliittymään uusi arvo.
   * @param {Event} e
   */
  const updateGridSize = (e) => {
    const fits = checkGridSize(parseInt(e.target.value));
    if (fits) setGridSize(e.target.valueAsNumber);
  };

  const updateCarriers = (e) => {
    const fits = checkShipAmount("carriers", parseInt(e.target.value));
    if (fits) setCarriers(e.target.valueAsNumber);
  };

  const updateBattleships = (e) => {
    const fits = checkShipAmount("battleships", parseInt(e.target.value));
    if (fits) setBattleships(e.target.valueAsNumber);
  };

  const updateCruisers = (e) => {
    const fits = checkShipAmount("cruisers", parseInt(e.target.value));
    if (fits) setCruisers(e.target.valueAsNumber);
  };

  const updateSubmarines = (e) => {
    const fits = checkShipAmount("submarines", parseInt(e.target.value));
    if (fits) setSubmarines(e.target.valueAsNumber);
  };

  const updateDestroyers = (e) => {
    const fits = checkShipAmount("destroyers", parseInt(e.target.value));
    if (fits) setDestroyers(e.target.valueAsNumber);
  };

  /**
   * Funktio, joka päivittää pelissä olevat arvot
   * pelaajien nimille, laudan koolle ja alusten määrille
   * vastaamaan käyttöliittymässä syötettyjä arvoja.
   * Funktio myös lopettaa pelin Settings-vaiheen.
   */
  const submit = () => {
    game.moves.setPlayerNames(1, player1Name);
    game.moves.setPlayerNames(2, player2Name);
    game.moves.setBoardSize(parseInt(gridSize));
    game.moves.setShipAmounts(shipAmounts);
    game.events.endPhase();
  };

  /**
   * Käyttöliittymän toiminnallisuus (eli käytännössä input-fieldit)
   */
  return (
    <div>
      <h1 className="title">Pelin asetukset</h1>
      <div id="settings-container">
        <div className="settingsDiv">
          <label className="settingsLabel" htmlFor="player1Name">
            Pelaajan 1 nimi:{" "}
          </label>
          <input
            className="settingsInput"
            type="text"
            id="player1Name"
            value={player1Name}
            onChange={(e) => setPlayer1Name(e.target.value)}
          />
          <label className="settingsLabel" htmlFor="player2Name">
            Pelaajan 2 nimi:{" "}
          </label>
          <input
            className="settingsInput"
            type="text"
            id="player2Name"
            value={player2Name}
            onChange={(e) => setPlayer2Name(e.target.value)}
          />
        </div>
        <div>
          <p>{error}</p>
        </div>
        <div className="settingsDiv">
          <label className="settingsLabel" htmlFor="gridSize">
            Pelilaudan koko (5-10):{" "}
          </label>
          <input
            className="settingsInput"
            type="number"
            id="gridSize"
            min="5"
            max="10"
            value={gridSize}
            onChange={updateGridSize}
          />
        </div>
        <div id="ship-container">
          <label className="settingsLabel" htmlFor="carriers">
            Lentotukialusten määrä:{" "}
          </label>
          <input
            className="settingsInput"
            type="number"
            id="carriers"
            min="0"
            value={carriers}
            onChange={updateCarriers}
          />
          <label className="settingsLabel" htmlFor="battleships">
            Taistelulaivojen määrä:{" "}
          </label>
          <input
            className="settingsInput"
            type="number"
            id="battleships"
            min="0"
            value={battleships}
            onChange={updateBattleships}
          />
          <label className="settingsLabel" htmlFor="cruisers">
            Risteilijöiden määrä:{" "}
          </label>
          <input
            className="settingsInput"
            type="number"
            id="cruisers"
            min="0"
            value={cruisers}
            onChange={updateCruisers}
          />
          <label className="settingsLabel" htmlFor="submarines">
            Sukellusveneiden määrä:{" "}
          </label>
          <input
            className="settingsInput"
            type="number"
            id="submarines"
            min="0"
            value={submarines}
            onChange={updateSubmarines}
          />
          <div id="destroyerDiv">
            <label className="settingsLabel" htmlFor="destroyers">
              Hävittäjien määrä:{" "}
            </label>
            <input
              className="settingsInput"
              type="number"
              id="destroyers"
              min="0"
              value={destroyers}
              onChange={updateDestroyers}
            />
          </div>
        </div>
        <div className="settingsDiv">
          <button id="settings-button" onClick={submit}>
            Valmis
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
