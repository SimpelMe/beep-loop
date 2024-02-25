<!DOCTYPE html>
<html lang="en" dir="ltr">

<head>
  <?php include dirname($_SERVER['DOCUMENT_ROOT']) . "/simpel.cc/php/head.php"; ?>
  <!-- <title>Beep-Loop</title> -->
  <meta charset="utf-8">
  <title>Beep</title>
  <link rel="stylesheet" href="style.css">
</head>

<body>
  <header>
    <?php include dirname($_SERVER['DOCUMENT_ROOT']) . "/simpel.cc/php/header.php"; ?>
    <!-- <nav>
      <a id="logo" class="cursordefault" href="/"><img src="../Simpel.png" alt="simpel icon" height="48" width="48"></a>
      <h1>Beep-Loop</h1>
      <a id="github" href="https://github.com/SimpelMe/beep-loop" target="_blank" rel="noopener noreferrer" title="watch source code">
        <img id="github-cat" src="../github.svg" alt="github logo">
      </a>
    </nav> -->
  </header>

  <main>
    <section id="countdown">
      <p id="beeping">Beeping in</p>
      <span id="time-remaining">&nbsp;</span>
      <p id="secondsLabel">seconds</p>

      <button id="muteButton">
        <svg id="speaker" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
          <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
          <path fill="white"
            d="M301.1 34.8C312.6 40 320 51.4 320 64V448c0 12.6-7.4 24-18.9 29.2s-25 3.1-34.4-5.3L131.8 352H64c-35.3 0-64-28.7-64-64V224c0-35.3 28.7-64 64-64h67.8L266.7 40.1c9.4-8.4 22.9-10.4 34.4-5.3zM425 167l55 55 55-55c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-55 55 55 55c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-55-55-55 55c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l55-55-55-55c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0z" />
        </svg>
        <!-- <span id="speaker" class="fa-solid fa-volume-xmark"></span> -->
        Currently muted.<br>Click this to enable.
      </button>
    </section>
    <details>
      <summary>Settings</summary>
      <form>
        <div>
          <label for="loop">Loop-Duration</label>
          <input type="number" id="loop" min="5" max="600" value="60" oninput="setLoop()" aria-label="loop duration in seconds"/>
          <span>s</span>
        </div>
        <div>
          <label for="frequency">Frequency</label>
          <input type="number" id="frequency" min="40" max="6000" value="440"  aria-label="frequency in hertz"/>
          <span>Hz</span>
        </div>
        <div>
          <label for="volume">Volume</label>
          <input type="number" id="volume" min="0" max="100" value="50"  aria-label="volume in percent"/>
          <span>%</span>
        </div>
        <div>
          <label for="duration">Beep-Duration</label>
          <input type="number" id="duration" min="1" max="5000" value="50"  aria-label="beep duration in milli seconds"/>
          <span>ms</span>
        </div>
      </form>
    </details>
  </main>

  <script src="script.js"></script>

</body>

</html>
