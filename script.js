var myGame = new WizardOrpheus('', `
Help the user escape a zombie apocalypse! Give the user a scenario and ask them to make decisions. The decisions would have 4 options, and one of the decisions is the correct one, while the others are wrong. This is a choose-your-own-adventure game. Continue the story until the user escapes the zombie apocalypse or when they die. To complete the game, the user must have selected the correct option 3 times in a row. If not, the game continues until the user escapes the zombie apocalypse or dies. When the expression (healthValue / 100) * 100 = 0, the user has officially died. Let the user know when they lost health. Don't forget about hunger. Every action will use some form of hunger, every interaction, reduce hunger by 10. When the expression (hungerValue / 100) * 100 = 0, the user has run out, and periodically drains health by 10 points every interaction, unless the user finds food, which there are different foods that restore different amounts of hunger.    
`)
let healthValue = 100
let maxHealth = 100

let hungerValue = 100
let maxHunger = 100

function updateHealthBar(newHealth) {
  let bar = document.getElementById('health-bar')
  bar.style.width = `${newHealth / maxHealth * 100}%`
}

function updateHungerBar(newHunger) {
  let bar = document.getElementById('hunger-bar')
  bar.style.width = `${newHunger / maxHunger * 100}%`
}
myGame.createUserAction({
  name: "message",
  parameters: ['Message from User to game'],
  howBotShouldHandle: 'Respond to the user'
})

document.getElementById('input').addEventListener('keypress', function(e) {
  if (e.key === "Enter") {
    let userInput = document.getElementById('input').value
    myGame.message(userInput)
    document.getElementById('conversation').innerHTML += '<p>' + userInput + '</p>'
    document.getElementById('input').value = ''
  }
})

myGame.variable('healthValue', 'Current health. Changes ( only negitively) as the user does things. Max health that the user can not increase over 100.', 100)
myGame.variable('hungerValue', 'Current hunger. Changes ( only negitively) as the user starts to starve. Max hunger that the user')
myGame.botAction('respond', 'Send a text response to the user', { message: 'What you want to say to the user' }, data => {
  //document.body.style.backgroundColor = 'rgb(0,0,0,${data.currentVariables.scaredLevel.value/100})';
  document.getElementById('conversation').innerHTML += '<p>' + data.message + '</p>'
  updateHealthBar(data.currentVariables.healthValue.value);  //document.getElementById('health').innerHTML = data.currentVariables.score.value
})