import { useState } from "react";
import "./Settings.css";

/**
 * Settings-component represents a game phase, where the players fill in their names,
 * board size and ship amounts
 * @param {Object} props
 * @returns Settings-element that describes what will show on the screen
 */
const Settings = ({ game }) => {
  /*
   * Variables for the player names, board size and ship amounts.
   * Variables describe the values in the game, not inside the Settings-component
   */
  const {
    player1Name: player1NameGame,
    player2Name: player2NameGame,
    boards,
    shipAmounts: initialShipAmounts,
  } = game.G;
  const gridSizeGame = boards[0].length;

  /*
   * Variables for the aforementioned values inside the Settings-component
   * Functions to change the values of these variables
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
   * Variable for an error-message and a function to change its value
   * Error-message is shown if the grid size or ship amounts are invalid
   */
  const [error, setError] = useState("");

  /*
   * Object, that contains the amount of ships for each ship type
   */
  const shipAmounts = {
    carriers,
    battleships,
    cruisers,
    submarines,
    destroyers,
  };

  /**
   * Function that checks whether the ship amounts are valid.
   * Valid ship amounts meet the following citeria:
   * 1) The combined area of the ships is at most half of the area of the game board
   * 2) Each ship type's amount is positive
   * @param {String} type the ship type of the ship whose value is being changed
   * @param {Number} amount the proposed new value for the amount of said ship type
   * @returns false, if the criteria is not met; true, if the criteria is met
   */
  const checkShipAmount = (type, amount) => {
    const amounts = { ...shipAmounts, [type]: amount };
    // Checks criteria 1
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

    //Checks criteria 2
    if (
      amounts.carriers < 0 ||
      amounts.battleships < 0 ||
      amounts.cruisers < 0 ||
      amounts.submarines < 0 ||
      amounts.destroyers < 0
    )
      return false;

    // Resets error message to empty when all criteria is met
    setError("");
    return true;
  };

  /**
   * Function that checks whether the board size is valid.
   * Valid board size meets the following criteria:
   * 1) The combined area of the ships is at most half of the area of the game board
   * 2) The board size is at least 5 and at most 10
   * @param {Number} gridSize the proposed new value for the board size
   * @returns false, if the criteria is not met; true, if the criteria is met
   */
  const checkGridSize = (gridSize) => {
    // Checks criteria 1, criteria must be checked both when updating ship amount and when updating grid size!!
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
    // Checks criteria 2
    if (gridSize < 5 || gridSize > 10) {
      setError("Pelilaudan koon on oltava väliltä 5-10");
      return false;
    }
    // Resets error message to empty when all criteria is met
    setError("");
    return true;
  };

  /**
   * Functions to update the board size and amounts of different ship types in the GUI.
   * Calls the checkGridSize-function with argument new inputted value, or
   * Calls the checkShipAmount-function with arguments ship type and new inputted value.
   * If the check-function returns true, the new value is updated to the GUI.
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
   * Function that updates the player names, board size and ship amounts
   * in the game to match the values inputted in the GUI.
   * Function also ends the Settings-phase.
   */
  const submit = () => {
    // Checks that the players have added at least one ship to the game
    const sum = Object.values(shipAmounts).reduce((acc, curr) => acc + curr, 0);
    if (sum <= 0) {
      setError("Laivoja on oltava enemmän kuin nolla!");
      return;
    }
    game.moves.setPlayerNames(1, player1Name);
    game.moves.setPlayerNames(2, player2Name);
    game.moves.setBoardSize(parseInt(gridSize));
    game.moves.setShipAmounts(shipAmounts);
    game.events.endPhase();
  };

  /**
   * The layout of the Settings-component
   */
  return (
    <div>
      <h1 className="title">Pelin asetukset</h1>
      <div id="settings-container">
        <div className="settingsDiv">
          <div className="labelInput">
            <label className="settingsLabel" htmlFor="player1Name">
              Pelaajan 1 nimi:{" "}
            </label>
            <input
              className="settingsInput long"
              type="text"
              id="player1Name"
              value={player1Name}
              onChange={(e) => setPlayer1Name(e.target.value)}
            />
          </div>
          <div className="labelInput">
            <label className="settingsLabel" htmlFor="player2Name">
              Pelaajan 2 nimi:{" "}
            </label>
            <input
              className="settingsInput long"
              type="text"
              id="player2Name"
              value={player2Name}
              onChange={(e) => setPlayer2Name(e.target.value)}
            />
          </div>
        </div>
        <div className="settingsDiv">
          <div className="labelInput">
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
        </div>
        <div id="ship-container">
          <div className="labelInput">
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
          </div>
          <div className="labelInput">
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
          </div>
          <div className="labelInput">
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
          </div>
          <div className="labelInput">
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
          </div>
          <div id="destroyerDiv" className="labelInput">
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
        <div id="submitButtonDiv">
          <button id="submit-button" onClick={submit}>
            Valmis
          </button>
        </div>
        <div id="error">
          <p>{error}</p>
        </div>
      </div>
    </div>
  );
};

export default Settings;
