import { useState } from "react";

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
   * Error-viesti näkyy käyttöliittymässä, jos alusten määrä ylittää sallitun rajan
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
   * Funktiot eri alustyyppien arvojen päivittämiseen käyttöliittymässä.
   * Kutsuu checkShipAmount-funktiota argumenteilla aluksen tyyppi ja syötetty uusi arvo.
   * Jos checkShipAmount-funktio palauttaa arvon true, päivitetään käyttöliittymään uusi arvo.
   * @param {Event} e
   */
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
      <label htmlFor="player1Name">Pelaajan 1 nimi: </label>
      <input
        type="text"
        id="player1Name"
        value={player1Name}
        onChange={(e) => setPlayer1Name(e.target.value)}
      />
      <label htmlFor="player2Name">Pelaajan 2 nimi: </label>
      <input
        type="text"
        id="player2Name"
        value={player2Name}
        onChange={(e) => setPlayer2Name(e.target.value)}
      />
      <label htmlFor="gridSize">Pelilaudan koko (5-10): </label>
      <input
        type="number"
        id="gridSize"
        min="5"
        max="10"
        value={gridSize}
        onChange={(e) => setGridSize(e.target.value)}
      />
      <label htmlFor="carriers">Lentotukialusten määrä: </label>
      <input
        type="number"
        id="carriers"
        min="0"
        value={carriers}
        onChange={updateCarriers}
      />
      <label htmlFor="battleships">Taistelulaivojen määrä: </label>
      <input
        type="number"
        id="battleships"
        min="0"
        value={battleships}
        onChange={updateBattleships}
      />
      <label htmlFor="cruisers">Risteilijöiden määrä: </label>
      <input
        type="number"
        id="cruisers"
        min="0"
        value={cruisers}
        onChange={updateCruisers}
      />
      <label htmlFor="submarines">Sukellusveneiden määrä: </label>
      <input
        type="number"
        id="submarines"
        min="0"
        value={submarines}
        onChange={updateSubmarines}
      />
      <label htmlFor="destroyers">Hävittäjien määrä: </label>
      <input
        type="number"
        id="destroyers"
        min="0"
        value={destroyers}
        onChange={updateDestroyers}
      />
      <button onClick={submit}>Valmis</button>
      <p>{error}</p>
    </div>
  );
};

export default Settings;
