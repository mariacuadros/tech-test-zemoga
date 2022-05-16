const cardsInfo = [
    {
        "name": "Kanye West",
        "description": "Born in Atlanta and raised in Chicago, West was first known as a producer for Roc-A-Fella Records in the early 2000s, producing singles for several mainstream artists.",
        "category": "entertainment",
        "picture": "../assets/img/kanye_west.jpg",
        "lastUpdated": "2020-03-10T23:08:57.892Z",
        "votes": {
            "positive": 23,
            "negative": 36
        }
    },
    {
        "name": "Mark Zuckerberg",
        "description": "Born in White Plains, New York, Zuckerberg attended Harvard University, where he launched the Facebook social networking service from his dormitory room on February 4, 2004.",
        "category": "business",
        "picture": "../assets/img/mark.jpg",
        "lastUpdated": "2021-02-14T23:10:19.134Z",
        "votes": {
            "positive": 418,
            "negative": 324
        }
    },
    {
        "name": "Cristina Fernández de Kirchner",
        "description": "Her first term of office started with a conflict with the agricultural sector, and her proposed taxation system was rejected.",
        "category": "politics",
        "picture": "../assets/img/cristina.jpg",
        "lastUpdated": "2020-12-10T23:41:07.120Z",
        "votes": {
            "positive": 45,
            "negative": 97
        }
    },
    {
        "name": "Malala Yousafzai",
        "description": "The daughter of educational activist Ziauddin, Yousafzai was born to a Pashtun family in Mingora, Khyber Pakhtunkhwa, Pakistan. Her family came to run a chain of schools in the region.",
        "category": "politics",
        "picture": "../assets/img/malala.jpg",
        "lastUpdated": "2020-12-10T23:41:07.120Z",
        "votes": {
            "positive": 18,
            "negative": 3
        }
    },
    {
        "name": "Elon Musk",
        "description": "In 2002, Musk founded SpaceX, an aerospace manufacturer and space transport services company, of which he is CEO, CTO, and lead designer.",
        "category": "business",
        "picture": "../assets/img/elon.jpg",
        "lastUpdated": "2020-12-20T23:43:38.041Z",
        "votes": {
            "positive": 1237,
            "negative": 894
        }
    },
    {
        "name": "Greta Thumberg",
        "description": "Thunberg's activism started after convincing her parents to adopt several lifestyle choices to reduce their own carbon footprint.",
        "category": "environment",
        "picture": "../assets/img/greta.jpg",
        "lastUpdated": "2021-02-26T23:44:50.326Z",
        "votes": {
            "positive": 118,
            "negative": 45
        }
    }
]
const voteIntentions = {};

function convertCardToHtml(cardInfo, cardIndex) {

    const name = cardInfo.name;
    const description = cardInfo.description;
    const picture = cardInfo.picture;
    const positiveVotes = cardInfo.votes.positive;
    const negativeVotes = cardInfo.votes.negative;
    const totalVotes = positiveVotes + negativeVotes;
    const buttonVoteText = getButtonText(cardIndex);

    const positivePercentage = ((positiveVotes / totalVotes) * 100).toFixed(1);
    const negativePercentage = ((negativeVotes / totalVotes) * 100).toFixed(1);

    return `<div class="card" style="background-image: url('${picture}');">
                <div class="card-info">
                    <img class="buttom-thum-down__img" src="./assets/img/thumbs-down.svg" alt="Thumb down">
                    <div class="cards-container__celebrity-info">
                        <div class="cards-container__celebrity-info__text">
                            <h3 class="celebrity-name">${name}</h3>
                            <span class="celebrity-description">${description}</span>
                        </div>
                        <div class="cards-container__celebrity-info__icons">
                            <span class="vote-info">1 month ago in Entertainment</span>
                            <div class="cards-container__buttons">
                                <button id="buttom-thum-up-${cardIndex}" class="buttom-thum-up" type="button" onclick="onThumbsUpClick(${cardIndex})">
                                    <img src="./assets/img/thumbs-up.svg" alt="Thumb up">
                                </button>
                                <button id="buttom-thum-down-${cardIndex}" class="buttom-thum-down" type="button" onclick="onThumbsDownClick(${cardIndex})">
                                    <img src="./assets/img/thumbs-down.svg" alt="Thumb down">
                                </button>
                                <button id="buttom-vote-now-${cardIndex}" class="buttom-vote-now" type="button"  disabled onclick="onVoteNowClick(${cardIndex})">
                                    ${buttonVoteText}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="gauge-bar-container">
                    <div class="gauge-bar__thums-up" style="width:${positivePercentage}%;">
                        <img src="./assets/img/thumbs-up.svg" alt="Thumb up">
                        <span class="votes-result-info">${positivePercentage}%</span>
                    </div>
                    <div class="gauge-bar__thums-down" style="width:${negativePercentage}%;">
                        <span class="votes-result-info">${negativePercentage}%</span>
                        <img src="./assets/img/thumbs-down.svg" alt="Thumb down">
                    </div>

                </div>
            </div>`;

}

function onThumbsUpClick(cardIndex) {
    const clickedButtonUp = document.getElementById("buttom-thum-up-" + cardIndex);
    const buttonDown = document.getElementById("buttom-thum-down-" + cardIndex);

    clickedButtonUp.classList.add('buttom-thumb-active');
    buttonDown.classList.remove('buttom-thumb-active');

    enableVoteNowButton(cardIndex);

    voteIntentions[cardIndex] = "positive"; // votes intentions. Eg: { 0: "positive"}
    console.log(voteIntentions)

}

function onThumbsDownClick(cardIndex) {

    const clickedButtonDown = document.getElementById("buttom-thum-down-" + cardIndex);
    const buttonUp = document.getElementById("buttom-thum-up-" + cardIndex);

    clickedButtonDown.classList.add("buttom-thumb-active");
    buttonUp.classList.remove("buttom-thumb-active");

    enableVoteNowButton(cardIndex);

    voteIntentions[cardIndex] = "negative"; // votes intentions. Eg: { 0: "negative"}
    console.log(voteIntentions)

}

function enableVoteNowButton(cardIndex) {
    const voteNow = document.getElementById("buttom-vote-now-" + cardIndex);
    voteNow.disabled = false;
}

function onVoteNowClick(cardIndex) {
    if (voteIntentions[cardIndex] === "positive") {
        voteUpForPerson(cardIndex);

    } else if (voteIntentions[cardIndex] === "negative") {
        voteDownForPerson(cardIndex);
    }
    voteIntentions[cardIndex] = "voted";

    drawCardsInHtml();
}

function voteUpForPerson(cardIndex) {
    cardsInfo[cardIndex].votes.positive += 1;
}

function voteDownForPerson(cardIndex) {
    cardsInfo[cardIndex].votes.negative += 1;
}

function getButtonText(cardIndex) {
    if (voteIntentions[cardIndex] === "voted") {
        return "Vote Again";
    } else {
        return "Vote Now";
    }
}

function drawCardsInHtml() {
    const cardsHtml = [];

    for (let i = 0; i < cardsInfo.length; i++) {
        const currentCardInfo = cardsInfo[i];
        const cardHtml = convertCardToHtml(currentCardInfo, i);
        cardsHtml.push(cardHtml);
    }

    const cardsContainerDiv = document.getElementById("cards-container");

    let allCardsHtml = "";

    for (let i = 0; i < cardsHtml.length; i++) {
        allCardsHtml += cardsHtml[i];
    }

    cardsContainerDiv.innerHTML = allCardsHtml;
}






drawCardsInHtml();

