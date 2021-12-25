
/* logic
- create a message
- show the message
- allow to dismiss the message through the dismiss button

once the message is dismissed the idea is to go through the loop one more time, with a different title and text values
*/
const notification = document.querySelector('.notification');

// function called when the button to dismiss the message is clicked
function dismissMessage() {
  // remove the .received class from the .notification widget
  notification.classList.remove('received');
}

// function showing the message
function showMessage() {
  const dismissAfter = 8000;
  // add a class of .received to the .notification container
  notification.classList.add('received');

  // attach an event listener on the button to dismiss the message
  // include the once flag to have the button register the click only one time
  const button = document.querySelector('.notification__message button');
  button.addEventListener('click', dismissMessage, { once: true });
  setTimeout(function () {
    dismissMessage();
  }, dismissAfter);
}

// function generating a message with a random title and text
function generateMessage(delay, title, msg, color) {
  // after an arbitrary and brief delay create the message and call the function to show the element
  const timeoutID = setTimeout(() => {
    // update the message with the random values and changing the class name to the title's option
    const message = document.querySelector('.notification__message');
    message.querySelector('h1').textContent = title;
    message.querySelector('p').innerHTML = msg;
    const notification = document.querySelector('.message--success');
    notification.style.setProperty("border-left-color", color);
    // call the function to show the message
    showMessage();
    clearTimeout(timeoutID);
  }, delay);
}

// immediately call the generateMessage function to kickstart the loop
