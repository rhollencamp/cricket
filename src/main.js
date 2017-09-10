import * as crypto from './crypto';

import 'bootstrap';
import './main.less';

function component() {
  var element = document.createElement('div');

  var salt = crypto.generateSalt();
  var key = crypto.createKey('foobar', salt);

  element.innerHTML = salt;

  return element;
}

// document.body.appendChild(component());

