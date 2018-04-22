import { SPACEBAR_KEYCODE } from './constants/app';

const interactiveElements = [
  'input',
  'button:not([data-activation])',
  'textarea',
  'a',
  'select'
];

const listeners = [
  {
    initiateEvent: 'keydown',
    stopEvent: 'keydown',
    fireEvent: 'keyup',
    initiateValidator: isSpacebarEvent,
    releaseValidator: isSpacebarEvent,
    stopValidator: () => true
  },
  {
    initiateEvent: 'touchstart',
    stopEvent: 'touchstart',
    fireEvent: 'touchend',
    initiateValidator: isValidTouchClickEvent,
    releaseValidator: () => true,
    stopValidator: () => true
  },
  {
    initiateEvent: 'mousedown',
    stopEvent: 'mousedown',
    fireEvent: 'mouseup',
    initiateValidator: isValidTouchClickEvent,
    releaseValidator: () => true,
    stopValidator: () => true
  }
];

export default function listenForActivations({ onInitiate, onFire, onStop }) {
  listeners.forEach(({
    initiateEvent,
    fireEvent,
    stopEvent,
    initiateValidator,
    releaseValidator,
    stopValidator
  }) => listenFor(
    initiateEvent,
    fireEvent,
    stopEvent,
    initiateValidator,
    releaseValidator,
    stopValidator,
    onInitiate,
    onFire,
    onStop
  ));
}

function listenFor(
  initiateEvent,
  fireEvent,
  stopEvent,
  initiateValidator,
  releaseValidator,
  stopValidator,
  onInitiate,
  onFire,
  onStop
) {
  const preventDefaultListener = event => {
    event.preventDefault();
  }

  const stopListener = (event) => {
    if (isValidStopEvent() && stopValidator(event)) {
      event.preventDefault();

      onStop();
    }
  }

  const initiateListener = (event) => {
    if (isValidActivationEvent(event) && initiateValidator(event)) {
      event.preventDefault();

      window.removeEventListener(initiateEvent, initiateListener);
      window.removeEventListener(stopEvent, stopListener);

      window.addEventListener(fireEvent, fireListener);
      window.addEventListener(initiateEvent, preventDefaultListener, { passive: false });

      onInitiate();
    }
  };

  const fireListener = (event) => {
    if (releaseValidator(event)) {
      event.preventDefault();

      onFire();

      window.removeEventListener(fireEvent, fireListener);
      window.removeEventListener(initiateEvent, preventDefaultListener);
      window.removeEventListener(stopEvent, preventDefaultListener);

      listenFor(
        initiateEvent,
        fireEvent,
        stopEvent,
        initiateValidator,
        releaseValidator,
        stopValidator,
        onInitiate,
        onFire,
        onStop
      );
    }
  };

  window.addEventListener(initiateEvent, initiateListener, { passive: false });
  window.addEventListener(stopEvent, stopListener, { passive: false });
}

function isValidActivationEvent(event) {
  return (
    Boolean(document.querySelector('[data-activation]')) &&
    !document.querySelector('[data-stop]') &&
    !document.querySelector('[data-modal]') &&
    !event.repeat &&
    !interactiveElements.includes(String(event.target.tagName).toLowerCase()) &&
    !event.target.closest(interactiveElements.join(','))
  );
}

function isValidTouchClickEvent(event) {
  return !!event.target.closest('[data-activation]');
}

function isSpacebarEvent(event) {
  return event.keyCode === SPACEBAR_KEYCODE;
}

function isValidStopEvent() {
  return Boolean(document.querySelector('[data-stop]'));
}
