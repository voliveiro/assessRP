document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('evaluate-btn').addEventListener('click', assessCompetencies);
});

function assessCompetencies() {
    const A1 = document.getElementById("A1").checked;
    const A2 = document.getElementById("A2").checked;
    const A3 = document.getElementById("A3").checked;

    const result = document.getElementById("result");
    const competenciesDiv = document.getElementById("competencies");
    const nextRoundDiv = document.getElementById("next-round");
    const finalRoundDiv = document.getElementById("final-round");

    nextRoundDiv.innerHTML = '';  // Clear previous results
    finalRoundDiv.innerHTML = ''; // Clear previous results

    if (A1 && A2 && A3) {
        result.textContent = 'All done';
        disableCheckboxes(competenciesDiv);
    } else if (!A1 && !A2 && !A3) {
        result.textContent = 'Repeat A1, A2, A3';
        disableCheckboxes(competenciesDiv);
        generateNextRoundCheckboxes(nextRoundDiv, ['A1', 'A2', 'A3'], 'Round 2');
    } else if (A1 && A2 && !A3) {
        result.textContent = 'Repeat A3';
        disableCheckboxes(competenciesDiv, ['A1', 'A2']);
        generateNextRoundCheckboxes(nextRoundDiv, ['A3'], 'Round 2');
    } else if (A1 && !A2 && !A3) {
        result.textContent = 'Repeat A2 and A3';
        disableCheckboxes(competenciesDiv, ['A1']);
        generateNextRoundCheckboxes(nextRoundDiv, ['A2', 'A3'], 'Round 2');
    } else if (A1 && A3 && !A2) {
        result.textContent = 'Repeat A2';
        disableCheckboxes(competenciesDiv, ['A1', 'A3']);
        generateNextRoundCheckboxes(nextRoundDiv, ['A2'], 'Round 2');
    } else if (!A1 && A2 && !A3) {
        result.textContent = 'Repeat A1, A2, A3';
        disableCheckboxes(competenciesDiv);
        generateNextRoundCheckboxes(nextRoundDiv, ['A1', 'A2', 'A3'], 'Round 2');
    } else if (!A1 && !A2 && A3) {
        result.textContent = 'Repeat A1 and A2';
        disableCheckboxes(competenciesDiv, ['A3']);
        generateNextRoundCheckboxes(nextRoundDiv, ['A1', 'A2'], 'Round 2');
    } else if (!A1 && A2 && A3) {
        result.textContent = 'Repeat A1';
        disableCheckboxes(competenciesDiv, ['A2', 'A3']);
        generateNextRoundCheckboxes(nextRoundDiv, ['A1'], 'Round 2');
    } else {
        result.textContent = 'Please complete a valid combination of selections.';
    }

    // Add "Assess Competency Again" button after Round 2 if not all competencies are met
    if (!(A1 && A2 && A3)) {
        const assessAgainBtn = document.createElement('button');
        assessAgainBtn.textContent = 'Assess';
        assessAgainBtn.style.marginTop = '10px';
        assessAgainBtn.addEventListener('click', assessRound2);
        nextRoundDiv.appendChild(assessAgainBtn);
    }
}

function disableCheckboxes(parentDiv, exclude = []) {
    const checkboxes = parentDiv.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        if (!exclude.includes(checkbox.id)) {
            checkbox.disabled = true;
            checkbox.classList.add('disabled');
        }
    });
}

function generateNextRoundCheckboxes(parentDiv, competencies, roundLabel) {
    parentDiv.innerHTML = `<h4>${roundLabel}: Recovery</h4>`;
    competencies.forEach(comp => {
        parentDiv.innerHTML += `<label><input type="checkbox" id="next-${comp}"> ${comp}</label><br>`;
    });
}

function assessRound2() {
    const nextA1 = document.getElementById("next-A1") ? document.getElementById("next-A1").checked : true;
    const nextA2 = document.getElementById("next-A2") ? document.getElementById("next-A2").checked : true;
    const nextA3 = document.getElementById("next-A3") ? document.getElementById("next-A3").checked : true;

    const finalRoundDiv = document.getElementById("final-round");
    finalRoundDiv.innerHTML = ''; // Clear previous results

    if (nextA1 && nextA2 && nextA3) {
        finalRoundDiv.innerHTML = '<h4>All competencies met in Round 2</h4>';
    } else {
        finalRoundDiv.innerHTML = '<h4>Some competencies are still not met. Please continue assessment.</h4>';
        // If any competency is unchecked, generate Round 3 checkboxes
        let toRepeat = [];
        if (!nextA1) toRepeat.push('A1');
        if (!nextA2) toRepeat.push('A2');
        if (!nextA3) toRepeat.push('A3');
        
        finalRoundDiv.innerHTML += `<h4>Round 3: Recovery</h4>`;
        generateNextRoundCheckboxes(finalRoundDiv, toRepeat, 'Round 3');
    }
}
