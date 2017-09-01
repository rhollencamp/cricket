import * as crypto from './crypto';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function component() {
  var element = document.createElement('div');

  var salt = crypto.generateSalt();
  var key = crypto.createKey('foobar', salt);

  element.innerHTML = salt;

  return element;
}

document.body.appendChild(component());

