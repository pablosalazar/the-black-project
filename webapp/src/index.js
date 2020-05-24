import './assets/css/vendor/bootstrap.min.css';
import 'react-circular-progressbar/dist/styles.css';
import 'react-perfect-scrollbar/dist/css/styles.css';

let render = () => {
  import('./assets/css/sass/themes/theblack.style.scss').then((x) => {
    require('./AppRenderer');
  });
};

render();
