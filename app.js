let kittens = []
/**
 * Called when submitting the new Kitten Form
 * This method will pull data from the form
 * use the provided function to give the data an id
 * then add that data to the kittens list.
 * Then reset the form
 */
function addKitten(event) {
  event.preventDefault();

  const nameInput = document.querySelector('.kittenForm input[name="name"]');
  const kittenName = nameInput.value.trim();

  if (!kittenName) {
    return; // Ignore empty kitten names
  }

  const submittedKittensList = document.getElementById('submittedKittensList');
  const savedKittens = JSON.parse(localStorage.getItem('kittens')) || [];

  // Retrieve the existing saved kitten list from local storage // NEW //
//OLD? //  const savedKittens = JSON.parse(localStorage.getItem('kittens')) || [];

  // Check if the kitten name already exists in the list
  const existingKittenNames = savedKittens.map((kitten) => kitten.name.toLowerCase());
  if (existingKittenNames.includes(kittenName.toLowerCase())) {
    alert('A kitten with the same name already exists!');
    nameInput.value = ''; // Clear the input field
    return;
  }

  // Create a new kitten object and add it to the kittens array
  const newKitten = {
    name: kittenName,
    mood: Math.floor(Math.random() * 10) + 1,
    id: kittenName.toLowerCase(),
    // affection: 5,
    // Add other properties if needed
  };
  setKittenMood(newKitten);
  savedKittens.push(newKitten);
   saveKittens(savedKittens);
  kittens = savedKittens;

  // Create a list item for the new kitten // OLD
   const listItem = document.createElement('li');
   listItem.textContent = kittenName;

   // Image Maybe? //
   const image = document.createElement('img');
   image.src = 'moody-logo.png'; 
   image.height = '100px';
   image.width = '100px';
   listItem.appendChild(image);
 

  // Create a clear button for the new kitten
  const clearButton = document.createElement('button');
  clearButton.textContent = 'Clear';
  clearButton.addEventListener('click', () => {
    clearKitten(newKitten);
    submittedKittensList.removeChild(listItem);
    drawKittens(); // Update the list of kittens on the page
  });

  //Pet button? //
  const petButton = document.createElement('button');
  petButton.textContent = 'Pet';
  petButton.addEventListener('click', () => {
    pet(newKitten.id);
  });

  listItem.appendChild(image);
  listItem.appendChild(clearButton);
  listItem.appendChild(petButton);
  submittedKittensList.appendChild(listItem);

  // Save the updated kittens array to local storage
   saveKittens(savedKittens); 

 // localStorage.setItem('kittens', JSON.stringify(kittens)); // NEW //
  // Update the saved kitten list // OLD 
 // savedKittens.push(kittenName); // OLD

  kittens = savedKittens; //NEW// Save array to call storage//
  saveKittens(kittens);
  
  // Display a success message
  const messageContainer = document.getElementById('messageContainer');
  messageContainer.textContent = `You added a kitten named "${kittenName}"!`;
  
    // Clear the input field
    nameInput.value = '';

      // Refresh the list of kittens on the page // NEW //
  // loadKittens();
}

   
  

  // Retrieve the existing saved kitten list from local storage
  const savedKittens = JSON.parse(localStorage.getItem('kittens')) || [];
  kittens = savedKittens
//   //!SECTION
//   // Create a new kitten object and add it to the kittens array
//  const newKitten = {
//   name: kittenName,
//   // Add other properties if needed
//   };

//   // Update the saved kitten list
//   savedKittens.push(newKitten);

//   // Save the updated kitten list to local storage
//   saveKittens(savedKittens);

//   // Display a success message
//   // const messageContainer = document.getElementById('messageContainer');
//  // messageContainer.textContent = `You added a kitten named "${kittenName}"!`;
//   // Clear the input field
// //  nameInput.value = ''; 






/**
 * Converts the kittens array to a JSON string then
 * Saves the string to localstorage at the key kittens 
 */
function saveKittens(kittens) {
  localStorage.setItem('kittens', JSON.stringify(kittens));
}

/**
 * Attempts to retrieve the kittens string from localstorage
 * then parses the JSON string into an array. Finally sets
 * the kittens array to the retrieved array
 */
function loadKittens() {
  const savedKittens = JSON.parse(localStorage.getItem('kittens')) || [];
  kittens = savedKittens; //new //
  const submittedKittensList = document.getElementById('submittedKittensList');
  submittedKittensList.innerHTML = '';

  for (const kitten of savedKittens) {
    const listItem = document.createElement('li');
    listItem.textContent = kitten.name;

    const clearButton = document.createElement('button');
    clearButton.textContent = 'Clear';
    clearButton.addEventListener('click', () => {
      clearKitten(kitten);
      submittedKittensList.removeChild(listItem);
      drawKittens();
    });

    listItem.appendChild(clearButton);
    submittedKittensList.appendChild(listItem);
  }
}

/**
 * Draw all of the kittens to the kittens element
 */
function drawKittens() {
  const kittensContainer = document.getElementById('kittens');
  kittensContainer.innerHTML = ''; // Clear the container before rendering

  for (const kitten of savedKittens) {
    const kittenCard = document.createElement('div');
    kittenCard.classList.add('card');
    kittenCard.classList.add('shadow');

    const kittenName = document.createElement('h3');
    kittenName.textContent = kitten.name;
    

    const kittenMood = document.createElement('p');
    kittenMood.textContent = `Mood: ${kitten.mood}`;

    const kittenImage = document.createElement('img');
    // kittenImage.src = `moody-logo.png`;
    kittenImage.style.width = '250px';
    kittenImage.style.height = '250px';
    kittenImage.classList.add(kitten.happy)
    kittenImage.classList.add(`mood-${kitten.mood}`); // Apply the CSS class based on the kitten's mood

    kittenImage.classList.add('kitten'); // Apply the base class for styling

   // Apply the appropriate class based on the kitten's mood
   if (kitten.mood === 0) {
    kittenImage.classList.add('gone');
  } else if (kitten.mood >= 1 && kitten.mood <= 3) {
    console.log( kitten.name ,'is angry')
    kittenImage.classList.add('angry');
  } else if (kitten.mood >= 4 && kitten.mood <= 7) {
    kittenImage.classList.add('tolerant');
  } else if (kitten.mood >= 8 && kitten.mood <= 10) {
    kittenImage.classList.add('happy');
  }


    const petButton = document.createElement('button');
    petButton.textContent = 'Pet';
    petButton.addEventListener('click', () => {
      pet(kitten.id); // Call the pet function when the button is clicked
    });

    const catnipButton = document.createElement('button');
    catnipButton.textContent = 'Catnip';
    catnipButton.addEventListener('click', () => {
      catnip(kitten.id); // Call the catnip function when the button is clicked
    });


    kittenCard.appendChild(kittenName);
    kittenCard.appendChild(kittenMood);
    kittenCard.appendChild(kittenImage);
    kittenCard.appendChild(petButton);
    kittenCard.appendChild(catnipButton); // Add the catnip button to the kitten card

    kittensContainer.appendChild(kittenCard);
  }
}

/**
 * Find the kitten by ID and display the result
 */
function findKitten() {
  const searchInput = document.getElementById('searchInput');
  const kittenId = searchInput.value.trim();

  // Clear the search input field
  searchInput.value = '';

  // Find the kitten by ID in the savedKittens array
  const kitten = findKittenById(kittenId, savedKittens);

  // Display the search result
  const searchResultContainer = document.getElementById('searchResultContainer');
  if (kitten) {
    searchResultContainer.textContent = `Found kitten: ${kitten.name} (ID: ${kitten.id})`;
  } else {
    searchResultContainer.textContent = `No kitten found with ID: ${kittenId}`;
  }
}

/**
 * Find the kitten in the array by its id
 * @param {string} id 
 * @param {Kitten[]} kittensArray
 * @return {Kitten|null}
 */
function findKittenById(id, kittensArray) {
  for (const kitten of kittensArray) {
    if (kitten.id === id) {
      return kitten;
    }
  }
  return null; // Return null if no kitten is found with the given id
}





/**
 * Find the kitten in the array of kittens
 * Generate a random Number
 * if the number is greater than .5 
 * increase the kittens affection
 * otherwise decrease the affection
 * @param {string} id 
 */
function pet(id) {
  // Find the kitten by ID in the savedKittens array
  const kitten = findKittenById(id, savedKittens);

  if (kitten) {
    // Generate a random number between 0 and 1
    const randomNumber = Math.random();

    // Adjust the kitten's mood based on the random number
    if (randomNumber > 0.5) {
      kitten.mood += 1; // Increase the kitten's mood
    } else {
      kitten.mood -= 1; // Decrease the kitten's mood
    }

    // Ensure the kitten's mood stays within the range of 1 to 10
    kitten.mood = Math.max(1, Math.min(10, kitten.mood));

    // Update the kitten's mood in the savedKittens array
    saveKittens(savedKittens);

    // Update the display of the kitten's mood on the page
    drawKittens();
  }
}

/**
 * Find the kitten in the array of kittens
 * Set the kitten's mood to tolerant
 * Set the kitten's affection to 5
 * @param {string} id
 */
function catnip(kittenId) {
  // Find the kitten with the given ID in the kittens array
  const kitten = savedKittens.find((kitten) => kitten.id === kittenId);

  // If the kitten is found, update its mood and affection
  if (kitten) {
    kitten.mood = 5;
    kitten.affection = 'Tolerant';
    saveKittens(savedKittens); // Save the updated kittens array
    drawKittens(); // Redraw the kittens to reflect the changes
  }
}


/**
 * Sets the kittens mood based on its affection
 * @param {Kitten} kitten 
 */
function setKittenMood(kitten) {
  if (kitten.affection > 7) {
    kitten.mood = 10;
  } else if (kitten.affection > 5) {
    kitten.mood = 7;
  } else if (kitten.affection > 3) {
    kitten.mood = 5;
  } else {
    kitten.mood = 3;
  }
}

/**
 * Removes all of the kittens from the array
 * remember to save this change
 */



function clearKitten(kitten){
  kittens = kittens.filter((k) => k !== kitten);

  // Save the updated kittens array to local storage
  saveKittens(kittens);
}

function clearKittens() {
  localStorage.removeItem('kittens');
  const submittedKittensList = document.getElementById('submittedKittensList');
  submittedKittensList.innerHTML = ''; // Clear the list on the page
  const messageContainer = document.getElementById('messageContainer');
  messageContainer.textContent = 'Kitten data cleared!';
}
/**
 * Removes the welcome content and should probably draw the 
 * list of kittens to the page. Good Luck
 */
function getStarted() {
  document.getElementById("welcome").remove();
  console.log('Good Luck, Take it away')
  drawKittens();
}


// --------------------------------------------- No Changes below this line are needed

/**
 * Defines the Properties of a Kitten
 * @typedef {{name: string, mood: number, affection: number}} Kitten
 */


/**
 * Used to generate a random string id for mocked
 * database generated Id
 * @returns {string}
 */
function generateId() {
  return Math.floor(Math.random() * 10000000) + "-" + Math.floor(Math.random() * 10000000)
}

window.addEventListener('DOMContentLoaded', () => {
  loadKittens();
});
