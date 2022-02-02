import Post from "./Post";
import json from './assets/json';
import './styles/styles.css';
import WebpackLogo from './assets/webpack-logo.png';

const post = new Post('Webpack post title', WebpackLogo);
console.log('Post to string:', post.toString());
console.log('JSON: ',json)