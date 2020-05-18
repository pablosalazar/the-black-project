import './assets/css/vendor/bootstrap.min.css';

let render = () => {
  import('./assets/css/sass/themes/gogo.dark.orange.scss').then((x) => {
    require('./AppRenderer');
  });
};

// require('./AppRenderer');
render();
