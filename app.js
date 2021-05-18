function EventObserver() {
  this.observers = [];
}

EventObserver.prototype = {
  subscribe: function (fn) {
    this.observers.push(fn);
    console.log(`You are now subscribed to ${fn.name}`);
  },
  unsubscribe: function (fn) {
    // Filter out from the list whatever matches the callback function. If there is no match, the callback gets to stay on the list. The filter returns a new list and reassigns the list of observers.
    this.observers = this.observers.filter(function (item) {
      if (item !== fn) {
        return item;
      }
    });
    console.log(`You are now unsubscribed from ${fn.name}`);
  },
  fire: function () {
    this.observers.forEach(function (item) {
      item.call();
    });
    if (getCurrMilliseconds) {
      document.getElementById('timeDisplay').innerHTML = `
      <div class="text-center col-sm-4">
        <div class="card border-light mb-3">
        <div class="card-header">You are now subscribed to</div>
        <div class="card-body">
          <h4 class="card-title">Milliseconds</h4>
          <p class="card-text">${new Date().getMilliseconds()}</p>
        </div>
      </div>
    `;
    } else if (getCurrSeconds) {
      document.getElementById('timeDisplay').innerHTML = `
      <div class="text-center col-sm-4">
        <div class="card border-light mb-3">
        <div class="card-header">You are now subscribed to</div>
        <div class="card-body">
          <h4 class="card-title">Seconds</h4>
          <p class="card-text">${new Date().getSeconds()}</p>
        </div>
      </div>
    `;
    }
  },
};

const click = new EventObserver();

// event listeners

document.querySelector('.sub-ms').addEventListener('click', function () {
  click.subscribe(getCurrMilliseconds);
});

document.querySelector('.unsub-ms').addEventListener('click', function () {
  click.unsubscribe(getCurrMilliseconds);
});
document.querySelector('.sub-s').addEventListener('click', function () {
  click.subscribe(getCurrSeconds);
});

document.querySelector('.unsub-s').addEventListener('click', function () {
  click.unsubscribe(getCurrSeconds);
});

document.querySelector('.fire').addEventListener('click', function () {
  click.fire(getCurrMilliseconds);
});

// click handler

const getCurrMilliseconds = function () {
  console.log(`Current Milliseconds: ${new Date().getMilliseconds()}`);
};

const getCurrSeconds = function () {
  console.log(`Current Seconds: ${new Date().getSeconds()}`);
};
