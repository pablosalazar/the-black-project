import './assets/css/vendor/bootstrap.min.css';

let render = () => {
  import('./assets/css/sass/themes/theblack.style.scss').then((x) => {
    require('./AppRenderer');
  });
};

// require('./AppRenderer');
render();
