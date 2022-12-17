const reference = [
  {
    "hour": 0,
    "min": 38, 
    "header": "Hell yeah!! Team 1 Solved problem C!",
    "images": [
        "balloon.jpg"
    ],
    "icon": "bi-alarm",
    "iconColor": "cornflowerblue", 
    "description": "They are lead AuIsDa by one problem solved but by penalty!!!"
  },
  {
    "hour": 0,
    "min": 39, 
    "header": "Hell yeah!! Team 2 Solved problem C!",
    "images": [
        "team2.png"
    ],
    "icon": "bi-alarm",
    "iconColor": "cornflowerblue", 
    "description": "CPM Soc member dilivering balloons!!!"
  },
  {
    "hour": 0,
    "min": 44, 
    "header": "Hell yeah!! Team 3 Solved problem A!",
    "images": [],
    "icon": "bi-alarm",
    "iconColor": "cornflowerblue", 
    "description": "CPM Soc member dilivering balloons!!!"
  },
  {
    "hour": 2,
    "min": 45, 
    "header": "15 Minute Left!!!!",
    "images": [],
    "icon": "bi-hourglass-split",
    "iconColor": "red", 
    "description": "CPM Soc member give warning!!!"
  },
  {
    "hour": 3,
    "min": "00", 
    "header": "Times Up!!!",
    "images": [],
    "icon": "bi-alarm",
    "iconColor": "", 
    "description": "Contest has ended, winner is from University Of Mars!!!"
  }
]

const liveObject = [
  {
    "hour": "0",
    "min": "00", 
    "header": "Contest Started!!!",
    "images": [],
    "icon": "bi-alarm",
    "iconColor": "", 
    "description": "It is now 12:00 and the contest has officially started! The first few minutes will mainly be a test of how fast the teams can read and type, and the first solve will come shortly."
  },
  {
    "hour": "0",
    "min": "06", 
    "header": "First Solve!!!",
    "images": ["balloonFirstPost.jpg"],
    "icon": "bi-balloon",
    "iconColor": "", 
    "description": "We have our first solve! Congratulations Hell Hunt from UNSW for solving problem A: A Menace 2 $ociety. They managed to solve it on their first go in only 6 minutes.."
  },
  {
    "hour": "0",
    "min": "17", 
    "header": "17 Minutes Passed!!!",
    "images": [],
    "icon": "bi-alarm",
    "iconColor": "", 
    "description": `We have a few more solves! Team <em>cflat</em> from The University of Canterbury has made their first solve - problem B: Begrudging Friendship 2. They are the first team to solve this problem, 9 minutes into the contest. A minute later, it was also solved by Hell Hunt (UNSW). UNSW Magenta and <em>e</em> (USyd) also solved it, both on their second try. <br><br>
    
    Calloc (Auckland) made their first solve on problem I: Iguana Honeymoon. This may look like an unusual choice, but the problems are not in order of difficulty. A few minutes later, Arts Students (Melbourne) and cflat (Canterbury) have also solved it.`
  },
]

const contestStartTime = new Date('2022-12-17T12:00:00')
const contestEndTime = new Date('2022-12-17T17:00:00')

/**
 * We might want to put newest event at the top
 */
function loadSingleEvent(event) {
  function loadEventStart(event) {
    return `<div class="border border-success p-2 border-opacity-10" role="alert">`;
  }

  function loadEventEnd(event) {
    return `</div><br>`;
  }

  function loadTimeTitle(event) {
    return `<p style="
      font-family: 'Courier New', monospace;
      font-size: 130%;
      font-weight: bold;
      padding: 0;
      margin: 0;
    ">
    <i class="bi ${event.icon}" style="font-size: 2rem; color: ${event.iconColor};">
    </i>[${event.hour}:${event.min}]</p> 
    <h5 style="
      margin-left: 2.7em;
      font-size: 140%;
      color: #ab8361;
    "
    ">${event.header}
    </h5>`;
  }

  function loadImage(event) {
    let imgStr = "";
    if (event.images.length > 0) {
      for (let imgPath of event.images) {
        imgStr += `<img class="mx-auto" src="/assets/icpc/${imgPath}">`;
      }
    }
    return imgStr;
  }

  function loadVideo(event) {
    if (event.video === undefined) return "";
    return event.video;
  }

  function loadDescription(event) {
    return `<p style="margin-left: 4.8em;">${event.description}</p><br>`;
  }

  var div = document.createElement("div");
  
  var htmlStr = loadEventStart(event);
  htmlStr += loadTimeTitle(event);
  htmlStr += loadImage(event);
  htmlStr += loadVideo(event);
  htmlStr += loadDescription(event);
  htmlStr += loadEventEnd(event);

  div.innerHTML = htmlStr;

  // Load into html
  document.getElementById("live-section").appendChild(div);
}

/**
 * html for contest laoading animation
 */
function loadingStart() {
  document.getElementById("loading-bar").innerHTML = `
    <div class="alert alert-success" role="alert">
      <h4 class="alert-heading">Welcome to the Live Blog!!!</h4>
      <p>Aww yeah, you are at the right place.</p>
      <hr>
      <div class=" d-flex align-items-center">
        The contest will starts at ${contestStartTime.toTimeString()}!
        <div class="spinner-border ms-auto" role="status" aria-hidden="true"></div>
      </div>
    </div>
  `;
}

/**
 * html for the progess
 */
function loadingProgress() {

  let progess = Math.abs(contestEndTime.getTime() - Date.now()) / (contestEndTime.getTime() - contestStartTime.getTime());
  // progess *= 100;

  document.getElementById("loading-bar").innerHTML = `
    <div class="progress">
      <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-label="Animated striped example" aria-valuenow="${progess}" aria-valuemin="0" aria-valuemax="100" style="width: ${progess}%"></div>
    </div><br>
  `;
}


if (liveObject.length == 0) {
  loadingStart();
} else {
  loadingProgress();
  for (let event of liveObject.reverse()) {
    loadSingleEvent(event);
  }
}

