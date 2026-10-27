const form = document.getElementById("skill-form");

function parseSkills(text) {
  return [...new Set(
    text.split(",")
      .map(skill => skill.trim())
      .filter(Boolean)
      .map(skill => skill.replace(/\s+/g, " "))
  )];
}

function findSkillMatches(currentSkills, requiredSkills) {
  const currentLookup = new Set(currentSkills.map(skill => skill.toLowerCase()));
  const matched = requiredSkills.filter(skill => currentLookup.has(skill.toLowerCase()));
  const missing = requiredSkills.filter(skill => !currentLookup.has(skill.toLowerCase()));
  const score = requiredSkills.length === 0
    ? 0
    : Math.round((matched.length / requiredSkills.length) * 100);

  return { matched, missing, score };
}

function displaySkills(elementId, skills, className, emptyMessage) {
  const list = document.getElementById(elementId);
  list.replaceChildren();

  if (skills.length === 0) {
    const item = document.createElement("li");
    item.textContent = emptyMessage;
    list.appendChild(item);
    return;
  }

  skills.forEach(skill => {
    const item = document.createElement("li");
    item.textContent = skill;
    item.className = className;
    list.appendChild(item);
  });
}

form.addEventListener("submit", event => {
  event.preventDefault();

  const current = parseSkills(document.getElementById("current-skills").value);
  const required = parseSkills(document.getElementById("required-skills").value);

  if (required.length === 0) {
    alert("Please enter at least one required skill.");
    return;
  }

  const result = findSkillMatches(current, required);
  document.getElementById("match-score").textContent = `${result.score}%`;
  document.getElementById("match-title").textContent =
    result.score === 100 ? "All listed skills match!" : "Your skill match";
  document.getElementById("match-bar").style.width = `${result.score}%`;

  displaySkills("matched-list", result.matched, "good", "No matching skills yet.");
  displaySkills("missing-list", result.missing, "missing", "No missing skills in this list.");
  document.getElementById("results").hidden = false;
});
