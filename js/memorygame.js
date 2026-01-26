const icons = ['🍎', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🥝'];
let cards = [];
let flipped = [];
let matched = [];
let moves = 0;

export function initMemoryGame() {
    const gameGrid = document.getElementById('memoryGameGrid');
    if (!gameGrid) return;
    
    gameGrid.innerHTML = '';
    flipped = [];
    matched = [];
    moves = 0;
    
    const cardIcons = [...icons, ...icons].sort(() => Math.random() - 0.5);
    
    cards = cardIcons.map((icon, index) => ({
        id: index,
        icon: icon,
        flipped: false,
        matched: false
    }));

    cards.forEach(card => {
        const cardEl = document.createElement('button');
        cardEl.className = 'memory-card';
        cardEl.dataset.id = card.id;
        cardEl.innerHTML = '?';
        cardEl.onclick = () => flipCard(card.id, cardEl);
        gameGrid.appendChild(cardEl);
    });
    
    updateMoveCount();
    updateMatchedCount();
}

function flipCard(id, cardEl) {
    if (cards[id].matched || cards[id].flipped || flipped.length === 2) {
        return;
    }

    cards[id].flipped = true;
    cardEl.classList.add('flipped');
    cardEl.innerHTML = cards[id].icon;
    flipped.push(id);

    if (flipped.length === 2) {
        moves++;
        updateMoveCount();
        checkMatch();
    }
}

function checkMatch() {
    const [id1, id2] = flipped;
    const isMatch = cards[id1].icon === cards[id2].icon;

    if (isMatch) {
        cards[id1].matched = true;
        cards[id2].matched = true;
        document.querySelector(`[data-id="${id1}"]`).classList.add('matched');
        document.querySelector(`[data-id="${id2}"]`).classList.add('matched');
        matched.push(id1, id2);
        updateMatchedCount();

        if (matched.length === cards.length) {
            showWinModal();
        }
        flipped = [];
    } else {
        setTimeout(() => {
            cards[id1].flipped = false;
            cards[id2].flipped = false;
            document.querySelector(`[data-id="${id1}"]`).classList.remove('flipped');
            document.querySelector(`[data-id="${id2}"]`).classList.remove('flipped');
            document.querySelector(`[data-id="${id1}"]`).innerHTML = '?';
            document.querySelector(`[data-id="${id2}"]`).innerHTML = '?';
            flipped = [];
        }, 800);
    }
}

function updateMoveCount() {
    const movesEl = document.getElementById('memoryMoves');
    if (movesEl) {
        movesEl.textContent = moves;
    }
}

function updateMatchedCount() {
    const matchedEl = document.getElementById('memoryMatched');
    if (matchedEl) {
        matchedEl.textContent = `${matched.length / 2}/8`;
    }
}

function showWinModal() {
    const winModal = document.getElementById('memoryWinModal');
    if (!winModal) return;
    
    document.getElementById('memoryFinalMoves').textContent = moves;
    document.getElementById('memoryFinalText').textContent = moves === 1 ? 'move' : 'moves';
    winModal.classList.add('show');
}

export function resetMemoryGame() {
    cards = [];
    flipped = [];
    matched = [];
    moves = 0;
    
    const winModal = document.getElementById('memoryWinModal');
    if (winModal) {
        winModal.classList.remove('show');
    }
    
    initMemoryGame();
}